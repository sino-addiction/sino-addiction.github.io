---
layout: default
title: News
nav_order: 15
---

# News

Stay up to date with the latest announcements from SANI.

<!-- This list is automatically generated from posts in /news/_posts/ -->
{% raw %}
<ul>
  {% for post in site.news %}
    <li>
      <h3>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <p>{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.summary }}</p>
    </li>
  {% endfor %}
</ul>
{% endraw %}
