import { QuartzComponentConstructor } from "./types"

// quartz/components/UmamiAnalytics.tsx
interface Options {
  websiteId: string
  scriptPath: string
}

const defaultOptions: Options = {
  websiteId: "8fa73cb0-59ab-4e6d-be90-6317483ebe77",
  scriptPath: "/analytics.js", // Changed from umami.js to avoid detection
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  function UmamiAnalytics() {
    return null // Component renders nothing visible
  }

  // The magic happens here
  UmamiAnalytics.afterDOMLoaded = `
    (function() {
      // Create a stealthy script loader
      var _u = function(){ (_u.q = _u.q || []).push(arguments) };
      var s = document.createElement('script');
      s.src = '${opts.scriptPath}';
      s.setAttribute('data-id', '${opts.websiteId}');
      s.async = 1;
      s.defer = 1;
      document.head.appendChild(s);
    })();
  `

  return UmamiAnalytics
}) satisfies QuartzComponentConstructor
