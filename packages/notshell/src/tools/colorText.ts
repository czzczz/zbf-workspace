import colors from 'colors';

export default function color(text: string, type: keyof colors.Color): string {
	return colors[type](text);
}

color.success = function (text: string) {
	return color(text, 'green');
};

color.fail = function (text: string) {
	return color(text, 'red');
};
