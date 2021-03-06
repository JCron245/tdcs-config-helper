import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#26292C',
			light: 'rgb(81, 91, 95)',
			dark: 'rgb(26, 35, 39)',
			contrastText: '#fff',
		},
		secondary: {
			main: '#FFB74D',
			light: 'rgb(255, 197, 112)',
			dark: 'rgb(200, 147, 89)',
			contrastText: 'rgba(0, 0, 0, 0.88)',
		},
	},
});
