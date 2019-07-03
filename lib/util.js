/**
 * @file util
 * @author niminjie(niminjiecide@gmail.com)
 */

module.exports = {
  /**
   * Get `html-webpack-plugin-after-html-processing` callback
   *
   * @param {Object} compiler webpack compiler
   * @param {Function} callback callback
   */
  afterHtmlProcessing: function(compiler, callback) {
    if (compiler.hooks) {
      /**
       * For webpack 4+
       */
      compiler.hooks.compilation.tap("HtmlStringReplaceWebpackPlugin", function(
        compilation
      ) {
        // HtmlWebPackPlugin 3.x
        if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
          compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
            "HtmlStringReplaceWebpackPlugin",
            callback
          );
        }
        // HtmlWebPackPlugin 4.x
        else {
          var HtmlWebpackPlugin = require('html-webpack-plugin');
          var hooks = HtmlWebpackPlugin.getHooks(compilation);
          hooks.beforeEmit.tapAsync('HtmlStringReplaceWebpackPlugin', callback);
        }
      });
    } else {
      /**
       * Support legacy
       */
      compiler.plugin("compilation", function(compilation) {
        compilation.plugin(
          "html-webpack-plugin-after-html-processing",
          callback
        );
      });
    }
  },

  /**
   * default replacement function
   *
   * @param {String} match matched string
   * @return {String}
   */
  defaultReplace(match) {
    return match;
  }
};
