# Content Model

This document describes the front-matter schema used across the SANI website.

## Pages (Default Content)

Applies to all files in the `/pages/` directory.

-   `title`: (String, Required) The title of the page, displayed in the navigation and at the top of the page.
-   `layout`: (String, Required) Should always be `default`.
-   `nav_order`: (Integer, Required) A number that determines the page's order in the navigation. Lower numbers come first.
-   `parent`: (String, Optional) The title of the parent page for creating nested navigation.
-   `has_children`: (Boolean, Optional) Set to `true` if this page is a parent to other pages.

**Example:**
```yaml
---
layout: default
title: About
nav_order: 2
---
```

## News Posts

Applies to all files in `/news/_posts/`.

-   `title`: (String, Required) The title of the news article.
-   `date`: (Date, Required) The publication date. Format: `YYYY-MM-DD`.
-   `author`: (String, Optional) The author of the post.
-   `summary`: (String, Optional) A short summary used for list views.
-   `layout`: (String, Required) Should always be `post`.

**Example:**
```yaml
---
layout: post
title: "SANI Initiative Launched"
date: 2025-09-24
author: "SANI Steering Committee"
---
```

## Studies

Applies to all files in the `/studies/` directory.

-   `id`: (String, Required) A unique identifier for the study (e.g., `SANI-001`).
-   `title`: (String, Required) The full title of the study.
-   `status`: (String, Required) The current status (e.g., "Recruiting", "In Progress", "Completed").
-   `sites`: (Array, Optional) A list of participating sites.
-   `summary`: (String, Required) A brief summary of the study's goals.
-   `methods`: (String, Optional) Brief description of methods used.
-   `data`: (String, Optional) Link or information about data access.
-   `outputs`: (Array, Optional) List of publications or other outputs.
-   `contact`: (String, Optional) Contact person or email for the study.
-   `layout`: (String, Required) Should always be `default`.

**Example:**
```yaml
---
layout: default
id: SANI-001
title: "EEG Biomarkers of Relapse Risk"
status: "Recruiting"
summary: "This study aims to identify EEG-based biomarkers that predict relapse in individuals with alcohol use disorder."
---
```
