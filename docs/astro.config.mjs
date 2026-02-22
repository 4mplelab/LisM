// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import rehypeExternalLinks from 'rehype-external-links';
import starlightThemeGalaxy from 'starlight-theme-galaxy'
import starlightImageZoom from 'starlight-image-zoom'

// https://astro.build/config
export default defineConfig({
	site: 'https://4mplelab.github.io',
	base: '/LisM',
	integrations: [
		starlight({
			plugins: [starlightThemeGalaxy(), starlightImageZoom()],
			title: 'LisMドキュメント',
			description: '自作キーボードLisMのドキュメントです。ビルドガイド・ファームウェア設定方法・HowToなどを掲載しています。',
			logo: { src: '/src/assets/logo.svg', alt: 'LisM Logo', replacesTitle: true, },
			defaultLocale: 'root',
			lastUpdated: true,
			locales: {
				root: {
					label: '日本語',
					lang: 'ja',
				},
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/4mplelab' },
				{ icon: 'x.com', label: 'x.com', href: 'https://x.com/4mple_' },
			],
			sidebar: [
				{
					label: 'ビルドガイド',
					items: [
						{ label: 'ビルドガイドTop', slug: 'build_guides' },
						{ label: '本体', slug: 'build_guides/main' },
						{
							label: 'モジュール',
							items: [
								{ label: 'トラックボールセンサー', slug: 'build_guides/modules/trackball_sensor' },
								{
									label: '水平ロータリーエンコーダー',
									slug: 'build_guides/modules/horizontal_rotary_encoder',
								},
								{
									label: '垂直ロータリーエンコーダー',
									slug: 'build_guides/modules/vertical_rotary_encoder',
								},
								{ label: 'キースイッチ', slug: 'build_guides/modules/key' },
							],
						},
						{
							label: 'ユニット',
							items: [
								{
									label: 'トラックボール (10-14mm)',
									slug: 'build_guides/units/trackball_10-14mm',
								},
								{ label: 'トラックボール (20mm)', slug: 'build_guides/units/trackball_20mm' },
							],
						},
					],
				},
				{ label: 'ファームウェア', slug: 'firmware' },
				{ label: 'HowTo', slug: 'how2' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://4mplelab.github.io/LisM/img/ogp_lism.png' } },
				{
					tag: 'script',
					attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-C13DXFJ6RG' },
				},
				{
					tag: 'script',
					attrs: { async: true, src: 'https://base-shop-4mple-lab.pages.dev/js/ogp-card.js' },
				},
				{
					tag: 'script',
					attrs: { async: true, src: 'https://base-shop-4mple-lab.pages.dev/js/ogp-card-renderer.js' },
				},
				{
					tag: 'link',
					attrs: { rel: 'stylesheet', href: 'https://base-shop-4mple-lab.pages.dev/styles/ogp-card.css' },
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-C13DXFJ6RG');
					`,
				},
			],
		}),
		mdx(),
	],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank', // 外部リンクを新しいタブで開く
          rel: ['noopener', 'noreferrer'], // セキュリティ対策
          content: { type: 'text', value: ' 🔗' }, // 外部リンクアイコン（オプション）
        },
      ],
    ],
  }
});
