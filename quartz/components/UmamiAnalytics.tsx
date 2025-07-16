import { QuartzComponentConstructor } from "./types"

interface Options {
  websiteId: string
}

const defaultOptions: Options = {
  websiteId: "8fa73cb0-59ab-4e6d-be90-6317483ebe77",
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  function UmamiAnalytics() {
    return null // No visible DOM elements
  }

  // Critical: Add the tracking script
  UmamiAnalytics.afterDOMLoaded = `
    (function() {
      var umami = function(){ (window.umami.q = window.umami.q || []).push(arguments); };
      var script = document.createElement('script');
      script.src = '/umami.js'; // Self-hosted file
      script.setAttribute('data-website-id', '${opts.websiteId}');
      script.async = true;
      document.head.appendChild(script);
    })();
  `

  return UmamiAnalytics
}) satisfies QuartzComponentConstructor
