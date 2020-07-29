import { future } from '@theme-ui/presets'

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

const rawColors = {
  text: "#000000",
  background: "#fff",
  primary: "#1779ba",
  secondary: "#0acc9e",
  warning: "#ce3030",
  muted: "#f3f3f4"
}

export default {
  ...future,
  colors: rawColors,
  space: [
    0,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512
  ],
  buttons: {
    primary: {
      color: 'background',
      bg: rawColors.secondary,
      boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
      backgroundImage: `linear-gradient(to top left, ${rawColors.primary}, ${shadeColor(rawColors.primary, 15)})`,
      '&:hover, &:focus': {
        bg: shadeColor(rawColors.primary, -25),
        backgroundImage: `linear-gradient(to top left, ${shadeColor(rawColors.primary, 10)}, ${shadeColor(rawColors.primary, 25)})`,
      }
    },
    secondary: {
      color: 'background',
      bg: rawColors.secondary,
      boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
      backgroundImage: `linear-gradient(to bottom right, ${rawColors.secondary}, ${shadeColor(rawColors.secondary, -15)})`,
      '&:hover, &:focus': {
        bg: shadeColor(rawColors.secondary, -25),
        backgroundImage: `linear-gradient(to bottom right, ${shadeColor(rawColors.secondary, -10)}, ${shadeColor(rawColors.secondary, -25)})`,
      }
    },
    warning: {
      color: 'background',
      bg: rawColors.secondary,
      boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
      backgroundImage: `linear-gradient(to bottom right, ${rawColors.warning}, ${shadeColor(rawColors.warning, -15)})`,
      '&:hover, &:focus': {
        bg: shadeColor(rawColors.secondary, -25),
        backgroundImage: `linear-gradient(to bottom right, ${shadeColor(rawColors.warning, -10)}, ${shadeColor(rawColors.warning, -25)})`,
      }
    },
    muted: {
      color: 'text',
      bg: rawColors.muted,
      '&:hover, &:focus': {
        bg: shadeColor(rawColors.muted, -5),
      }
    }
  },
  styles: {
    ...future.styles,
    a: {
      color: rawColors.primary,
      '&:hover, &:focus': {
        color: shadeColor(rawColors.primary, -20),
      }
    },
  },
  sizes: {
    container: 1100,
  }
}
