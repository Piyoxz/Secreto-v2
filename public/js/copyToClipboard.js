function copyToClipboard() {
            var dummy = document.getElementById("link");
            text = dummy.textContent
            var textAfter = text.substring(text.indexOf(":") + 1);
            navigator.clipboard.writeText(textAfter);
            alert("Link anda berhasil disalin");
}