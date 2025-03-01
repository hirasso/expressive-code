import { BaseStylesResolverFn } from '../helpers/style-settings'
import { ResolvedCoreStyles } from './core-styles'
import { ExpressiveCodePluginHooks } from './plugin-hooks'
import { ExpressiveCodeTheme } from './theme'

export type JsModulesResolverFn = ({
	theme,
	coreStyles,
	configClassName,
}: {
	theme: ExpressiveCodeTheme
	coreStyles: ResolvedCoreStyles
	configClassName: string
}) => string[] | Promise<string[]>

export interface ExpressiveCodePlugin {
	name: string
	/**
	 * The CSS styles that should be added to every page containing code blocks.
	 *
	 * All styles are scoped to Expressive Code by default, so they will not affect
	 * the rest of the page. SASS-like nesting is supported. If you want to add global styles,
	 * you can use the `@at-root` rule or target `:root`, `html` or `body` in your selectors.
	 *
	 * The engine's `getBaseStyles` function goes through all registered plugins
	 * and collects their base styles.
	 *
	 * If you provide a function instead of a string, it is called with an object argument
	 * containing the current theme, the resolved core styles and the config-dependent
	 * wrapper class name. It is expected to either return a string or a string promise.
	 *
	 * The calling code must take care of actually adding the collected styles to the page.
	 * For example, it could create a site-wide CSS stylesheet from the base styles
	 * and insert a link to it, or it could insert the base styles into a `<style>` element.
	 */
	baseStyles?: string | BaseStylesResolverFn | undefined
	/**
	 * JavaScript modules (pure code without any wrapping `script` tags) that should be added
	 * to every page containing code blocks.
	 *
	 * The engine's `getJsModules` function goes through all registered plugins,
	 * collects their JS modules and deduplicates them.
	 *
	 * If you provide a function instead of a string, it is called with an object argument
	 * containing the current theme, the resolved core styles and the config-dependent
	 * wrapper class name. It is expected to either return or promise a string array.
	 *
	 * The calling code must take care of actually adding the collected scripts to the page.
	 * For example, it could create site-wide JavaScript files from the returned modules
	 * and refer to them in a script tag with `type="module"`, or it could insert them
	 * into inline `<script type="module">` elements.
	 */
	jsModules?: string[] | JsModulesResolverFn | undefined
	hooks: ExpressiveCodePluginHooks
}
