class PreviewLinks {
  checkForActiveLinks() {
    document.querySelector('.results').addEventListener('click', e => {
      if (e.target.closest('.preview')) {
        const allPreviewLinks = Array.from(
          document.querySelectorAll('.preview__link')
        );
        allPreviewLinks.forEach(link =>
          link.classList.remove('preview__link--active')
        );
        e.target
          .closest('.preview')
          .querySelector('.preview__link')
          .classList.add('preview__link--active');
      }
    });
  }
}

export default new PreviewLinks();
