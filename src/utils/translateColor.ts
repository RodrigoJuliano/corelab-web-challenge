const colorMap = {
  '#f28b82': 'vermelho',
  '#fbbc04': 'laranja',
  '#fff475': 'amarelo',
  '#ccff90': 'verde',
  '#a7ffeb': 'azul',
  '#d7aefb': 'roxo',
  '#fdcfe8': 'rosa',
  '#ffffff': 'branco',
}

type ObjectKey = keyof typeof colorMap

// Translate color from hex code to human-friendly form
const translate = (color: string): string =>
  colorMap[color as ObjectKey] ?? color

export default translate
