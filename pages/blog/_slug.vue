<template>
  <article class="py-24 mx-auto prose sm:prose lg:prose-lg">
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img
      class="shadow-lg rounded-3xl"
      :src="article.img" :alt="article.alt"
    />

    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  }
}
</script>