---
layout: default
title: Studies
nav_order: 12
---

# Studies

This page lists the active and completed studies conducted under the SANI consortium.

<!-- TODO: This list will be automatically populated from the /studies/ collection. -->
{% raw %}
<ul>
  {% for study in site.studies %}
    <li>
      <a href="{{ study.url | relative_url }}">{{ study.title }}</a> ({{ study.status }})
    </li>
  {% endfor %}
</ul>
{% endraw %}

## How to Cite SANI Studies

<!-- TODO: Provide instructions on how to cite the consortium and its studies. -->
Please cite both the individual study publication and the main SANI overview paper (once available).
