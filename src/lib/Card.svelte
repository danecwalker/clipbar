<script>
  let _class = "";
  export { _class as class };
</script>

<div class="border border-zinc-800 rounded-xl overflow-hidden {_class}">
  <slot name="tool"></slot>
  <slot name="header"></slot>
  <slot name="content"></slot>
  <slot name="footer"></slot>
</div>