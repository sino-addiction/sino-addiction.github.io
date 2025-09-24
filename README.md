<!--
If you plan to use a custom domain like sani-initiative.org, create a file named CNAME in the root of this repository and add the domain name on a single line.
Example:
sani-initiative.org
-->

# SANI Website

This repository contains the source code for the official website of the Sino/Asian Addiction Neuroimaging Initiative (SANI), available at [https://sino-addiction.github.io](https://sino-addiction.github.io).

The site is built with [Jekyll](https://jekyllrb.com/) and uses the [Just the Docs](https://just-the-docs.github.io/just-the-docs/) theme.

## How to Run Locally

To preview your changes locally before pushing to GitHub:

1.  Install Ruby. Optionally install Bundler for a managed environment.
2.  Serve the site:
    ```bash
    jekyll serve --livereload
    ```
    Or with Bundler (if you add a Gemfile):
    ```bash
    bundle exec jekyll serve --livereload
    ```
3.  Open your browser and navigate to `http://127.0.0.1:4000`.

## How to Edit Content

All website content is written in Markdown.

### Edit an Existing Page

1.  Navigate to the `/pages/` directory.
2.  Find the corresponding `.md` file for the page you wish to edit (e.g., `about.md`).
3.  Edit the file in your text editor. Changes will be reflected on the local server if it's running.

### Add a New Page (Tab)

1.  Create a new `.md` file in the `/pages/` directory (e.g., `my-new-page.md`).
2.  Use the template from `/pages/templates/new-tab-template.md` as a starting point.
3.  Add the required front-matter at the top of the file:
    ```yaml
    ---
    layout: default
    title: My New Page
    nav_order: 10
    ---
    ```
4.  Add your Markdown content below the front-matter.

### Change Navigation Order

To change the order of pages in the top navigation bar, edit the `nav_order` value in the front-matter of the respective `.md` file in the `/pages/` directory. Lower numbers appear first.

### Add a News Post

1.  Create a new file in the `/_news/` directory.
2.  Use a filename you like (optionally `YYYY-MM-DD-my-title.md`).
3.  Use the template in `/pages/templates/news-post-template.md` as a starting point.
4.  Fill in the front matter (title, date, author, summary) and write the post content in Markdown.

## How to Change Theme Settings

Theme settings, such as color scheme or title, can be modified in the `_config.yml` file. See the [Just the Docs Configuration](https://just-the-docs.github.io/just-the-docs/docs/configuration/) for all available options.

## Publishing

The site is automatically built and deployed by GitHub Pages whenever changes are pushed to the `main` branch.
