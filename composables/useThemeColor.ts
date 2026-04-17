import { useSiteStore } from '~/stores/site'

interface HSL {
  h: number
  s: number
  l: number
}

function hexToHSL(hex: string): HSL {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function generatePalette(hex: string): Record<string, string> {
  const { h, s, l } = hexToHSL(hex)

  const baseSat = Math.max(s, 15)

  // 선택한 색의 lightness를 500번 기준으로 사용
  // 나머지는 상대적으로 밝게/어둡게
  const steps: [string, number, number][] = [
    ['50',  baseSat * 0.3,  Math.min(l + 44, 97)],
    ['100', baseSat * 0.4,  Math.min(l + 38, 94)],
    ['200', baseSat * 0.55, Math.min(l + 30, 90)],
    ['300', baseSat * 0.7,  Math.min(l + 20, 82)],
    ['400', baseSat * 0.85, Math.min(l + 10, 72)],
    ['500', baseSat,        l],
    ['600', baseSat,        Math.max(l - 8, 5)],
    ['700', baseSat,        Math.max(l - 15, 4)],
    ['800', baseSat * 0.95, Math.max(l - 22, 3)],
    ['900', baseSat * 0.9,  Math.max(l - 28, 2)],
  ]

  const palette: Record<string, string> = {}
  for (const [key, sat, light] of steps) {
    palette[key] = hslToHex(h, Math.min(sat, 100), light)
  }
  return palette
}

export function useThemeColor() {
  const siteStore = useSiteStore()

  const applyPalette = (hex: string) => {
    if (!import.meta.client) return
    const palette = generatePalette(hex)
    const root = document.documentElement
    for (const [key, value] of Object.entries(palette)) {
      root.style.setProperty(`--primary-${key}`, value)
    }
  }

  watch(
    () => siteStore.content.settings.primaryColor,
    (color) => applyPalette(color),
    { immediate: true }
  )

  const setPrimaryColor = (color: string) => {
    siteStore.updateSettings({ primaryColor: color })
  }

  return {
    setPrimaryColor,
    primaryColor: computed(() => siteStore.content.settings.primaryColor)
  }
}
