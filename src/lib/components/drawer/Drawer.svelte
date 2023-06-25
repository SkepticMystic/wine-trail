<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <slot />
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />
    <!-- <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul> -->

    <ul class="menu bg-base-200 w-56 h-full">
      <li>
        <details open>
          <summary>Parent</summary>
          <ul>
            <li><a>level 2 item 1</a></li>
            <li><a>level 2 item 2</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>Parent</summary>
          <ul>
            <li><a>level 2 item 1</a></li>
            <li><a>level 2 item 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
