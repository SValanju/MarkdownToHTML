const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$(function () {
    // Fetch the markdown file
    $.get("assets/content.md", function (markdownContent) {
        // Convert markdown to HTML using marked.js
        var htmlContent = marked.parse(markdownContent);

        htmlContent = htmlContent.replace("[TIMESTAMP]", getTimeDifference());

        // Inject the HTML into the content div
        $("#mdContent").html(htmlContent);

    }).fail(function () {
        $("#mdContent").html(
            '<p class="text-danger">Failed to load the markdown file.</p>'
        );
    });

    Init();
});

function Init() {
    $("#toggleTheme").click(function () {
        let icon = $("#toggleTheme i");
        let isDarkTheme = icon.hasClass("bi-moon-stars-fill");

        if (isDarkTheme) {
            icon.removeClass("bi-moon-stars-fill").addClass("bi-brightness-high-fill");
            $(this).attr("data-bs-title", "Light Theme");
        } else {
            icon.removeClass("bi-brightness-high-fill").addClass("bi-moon-stars-fill");
            $(this).attr("data-bs-title", "Dark Theme");
        }

        $(this).tooltip('dispose').tooltip();

        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });
}

function getTimeDifference() {
    const startDate = new Date(2024, 8); // September 2024 (Month is 0-based)
    const currentDate = new Date();

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    let timestamp = "";
    if (years > 0) {
        timestamp += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0 || timestamp === "") { // Include months if > 0 or if no years
        timestamp += `${months} month${months > 1 ? 's' : ''}`;
    }

    return timestamp.trim();
}