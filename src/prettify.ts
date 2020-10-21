import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babel';
import { Options } from 'prettier';

const prettierOptions: Options = {
	parser: 'babel',
	plugins: [babylon],
	useTabs: true,
	singleQuote: true,
	jsxBracketSameLine: true,
	printWidth: 140,
	trailingComma: 'none',
};

export const prettifyData = (data: any, title: string = 'tdcs.data') => {
	if (data?.startsWith(title)) {
		return prettier.format(data, prettierOptions);
	}
	return prettier.format(`${title} = ${data}`, prettierOptions);
};
