# Website Maintenance Guide

This document provides instructions for technical maintenance of the SANI website.

## GitHub Pages Settings

The site is deployed using GitHub Pages from the `main` branch of this repository. The source is the root directory. These settings are configured in the repository's "Pages" settings tab.

-   **Source**: Deploy from a branch
-   **Branch**: `main`, `/ (root)`

Ensure that the `CNAME` file exists in the root directory if a custom domain is being used.

## How to Change the Theme

The website uses the `just-the-docs` theme via the `remote_theme` setting in `_config.yml`.

To change the theme:

1.  Find a new Jekyll theme that is compatible with GitHub Pages.
2.  Update the `remote_theme` or `theme` key in `_config.yml`.
    ```yaml
    # Example for switching to another theme
    remote_theme: owner/theme-repo-name
    ```
3.  You may need to significantly refactor layouts, includes, and CSS overrides, as themes have different structures. Test extensively locally before pushing changes.

## How to Add a New Collection

Collections are used to group related content, like news posts or studies.

To add a new collection (e.g., for "Projects"):

1.  **Create a folder**: Create a new folder in the root directory, prefixed with an underscore (e.g., `_projects`).
2.  **Add content**: Add Markdown files to this new folder.
3.  **Configure `_config.yml`**: Register the collection in `_config.yml`.
    ```yaml
    collections:
      # ... existing collections
      projects:
        output: true
        permalink: /projects/:title/
    ```
4.  **Create a listing page**: Create a page (e.g., `/pages/projects.md`) to display a list of all items in the collection. You will need to use Liquid templating to loop through `site.projects`.
    ```liquid
    {% raw %}
    ---
    layout: default
    title: Projects
    ---
    # Our Projects

    <ul>
      {% for project in site.projects %}
        <li>
          <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
        </li>
      {% endfor %}
    </ul>
    {% endraw %}
    ```
