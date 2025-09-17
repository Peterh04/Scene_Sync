export default async function sharePage() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title, // The page title
        text: "Check this out!", // Optional message
        url: window.location.href, // The current page URL
      });
      console.log("Shared successfully!");
    } catch (err) {
      console.log("Share cancelled or failed:", err);
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
}
