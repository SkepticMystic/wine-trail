<script>
  import { RESOURCE_KINDS } from "$lib/const/resources";
</script>

<footer class="footer p-10 bg-base-100 text-base-content border-t shadow">
  <div>
    <a href="/" class="text-3xl">☯️</a>
    <a href="/" class="link text-xl">Yoga List</a>
  </div>

  <div>
    <span class="footer-title">Resources</span>
    {#each RESOURCE_KINDS as resource_kind}
      <a href="/{resource_kind}s" class="link link-hover capitalize">
        {resource_kind}s
      </a>
    {/each}
  </div>
  <div>
    <span class="footer-title">Company</span>
    <a href="/about" class="link link-hover">About us</a>
    <a href="/contact" class="link link-hover">Contact</a>
  </div>
  <div>
    <span class="footer-title">Legal</span>
    <a href="/legal/terms-of-use" class="link link-hover">Terms of use</a>
    <a href="/legal/privacy-policy" class="link link-hover">Privacy policy</a>
    <a href="/legal/cookie-policy" class="link link-hover">Cookie policy</a>
  </div>
</footer>
