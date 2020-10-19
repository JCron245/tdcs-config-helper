import { js_beautify } from "js-beautify";

const beautifyOptions: JSBeautifyOptions = {
    indent_size: 1,
    indent_char: "\t",
    max_preserve_newlines: 5,
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    brace_style: "collapse",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: 0,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
  };

export const beautifyData = (data: any, title: string = "tdcs") => {
    if (data.startsWith(title)) {
      return js_beautify(data, beautifyOptions);
    }
    return js_beautify(`${title} = ${data}`, beautifyOptions);
  };
  