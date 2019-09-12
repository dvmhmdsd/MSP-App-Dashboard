<template>
  <v-card color="rgba(0, 0, 0, 0.4)" dark>
    <v-card-text class="white--text text-center">
      <div class="headline mb-2">{{ itemTitle }}</div>
      <v-btn :to="link" text fab x-large>
        <v-icon large>{{ icon }}</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["itemTitle", "icon", "link"]
};
</script>
