import L from 'leaflet'

const FOREST = '#1A6B3F'
const FOREST_HI = '#268A53'
const EDITING = '#D97706'

export const createBranchMarkerIcon = (prefix: string, selected: boolean, editing: boolean) => {
  const w = selected ? 46 : 34
  const h = selected ? 58 : 44
  const color = editing ? EDITING : selected ? FOREST_HI : FOREST
  const shadow = selected
    ? 'drop-shadow(0 8px 14px rgba(14,56,38,.45))'
    : 'drop-shadow(0 4px 6px rgba(14,56,38,.3))'

  const html = `
    <div style="position:relative;width:${w}px;height:${h}px;filter:${shadow};transition:all .15s;">
      <svg width="${w}" height="${h}" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <path d="M18 1C9.2 1 2 8 2 16.8 2 28.6 18 45 18 45s16-16.4 16-28.2C34 8 26.8 1 18 1z"
              fill="${color}" stroke="#fff" stroke-width="2.2"/>
        <circle cx="18" cy="17" r="9" fill="rgba(255,255,255,.95)"/>
      </svg>
      <span style="position:absolute;left:0;right:0;top:${selected ? 11 : 8}px;text-align:center;
                   font:700 ${selected ? 12 : 9.5}px 'JetBrains Mono',monospace;color:${color};letter-spacing:.02em;">${prefix}</span>
    </div>`

  return L.divIcon({
    html,
    className: '',
    iconSize: [w, h],
    iconAnchor: [w / 2, h - 1],
  })
}
