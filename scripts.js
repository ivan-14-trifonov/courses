const coursesData = [
  {
    id: 1,
    title: 'User Experience. Human-centered Design',
    category: 'design',
    badge: 'Design',
    badgeTheme: 'design',
    price: '$240',
    author: 'by Cody Fisher',
    image: './assets/course-ux.png',
  },
  {
    id: 2,
    title: 'Human Resources – Selection and Recruitment',
    category: 'hr',
    badge: 'HR & Recruting',
    badgeTheme: 'hr',
    price: '$150',
    author: 'by Kathryn Murphy',
    image: './assets/course-hr-recruiting.png',
  },
  {
    id: 3,
    title: 'Highload Software Architecture',
    category: 'development',
    badge: 'Development',
    badgeTheme: 'development',
    price: '$600',
    author: 'by Brooklyn Simmons',
    image: './assets/course-highload.png',
  },
  {
    id: 4,
    title: 'Business Development Management',
    category: 'management',
    badge: 'Management',
    badgeTheme: 'management',
    price: '$400',
    author: 'by Dianne Russell',
    image: './assets/course-bizdev.png',
    featured: true,
  },
  {
    id: 5,
    title: 'Graphic Design Basic',
    category: 'design',
    badge: 'Design',
    badgeTheme: 'design',
    price: '$500',
    author: 'by Guy Hawkins',
    image: './assets/course-graphic-design.png',
  },
  {
    id: 6,
    title: 'Brand Management & PR Communications',
    category: 'marketing',
    badge: 'Marketing',
    badgeTheme: 'marketing',
    price: '$530',
    author: 'by Kristin Watson',
    image: './assets/course-brand-pr.png',
  },
  {
    id: 7,
    title: 'HR  Management and Analytics',
    category: 'hr',
    badge: 'HR & Recruting',
    badgeTheme: 'hr',
    price: '$200',
    author: 'by Leslie Alexander Li',
    image: './assets/course-hr-analytics.png',
  },
  {
    id: 8,
    title: 'Prduct Management Fundamentals',
    category: 'management',
    badge: 'Management',
    badgeTheme: 'management',
    price: '$480',
    author: 'by Marvin McKinney',
    image: './assets/course-product-mgmt.png',
  },
  {
    id: 9,
    title: 'The Ultimate Google Ads Training Course',
    category: 'marketing',
    badge: 'Marketing',
    badgeTheme: 'marketing',
    price: '$100',
    author: 'by Jerome Bell',
    image: './assets/course-google-ads.png',
  },
];

const COURSES_STEP = 9;

document.addEventListener('DOMContentLoaded', () => {
  const gridElement = document.querySelector('[data-courses-grid]');
  const searchInput = document.querySelector('.search__input');
  const tabs = document.querySelectorAll('.category-filter__item');
  const loadMoreButton = document.querySelector('[data-load-more]');

  if (!gridElement) {
    return;
  }

  let currentCategory = 'all';
  let searchQuery = '';
  let visibleCount = COURSES_STEP;

  const getFilteredCourses = () => {
    return coursesData.filter((course) => {
      const matchCategory =
        currentCategory === 'all' || course.category === currentCategory;

      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchQuery =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.author.toLowerCase().includes(normalizedQuery);

      return matchCategory && matchQuery;
    });
  };

  const renderCourses = () => {
    const filtered = getFilteredCourses();
    const limited = filtered.slice(0, visibleCount);

    gridElement.innerHTML = '';

    limited.forEach((course) => {
      const card = document.createElement('article');
      card.className =
        'card' +
        (course.featured ? ' card_type_featured' : '');
      card.dataset.category = course.category;

      card.innerHTML = `
        <img class="card__image" src="${course.image}" alt="${course.title}">
        <div class="card__content">
          <span class="card__badge card__badge_theme_${course.badgeTheme}">
            ${course.badge}
          </span>
          <h2 class="card__title">${course.title}</h2>
          <div class="card__info">
            <span class="card__price">${course.price}</span>
            <span class="card__divider"></span>
            <span class="card__author">${course.author}</span>
          </div>
        </div>
      `;

      gridElement.appendChild(card);
    });

    if (loadMoreButton) {
      loadMoreButton.disabled = visibleCount >= filtered.length;
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      if (!category || category === currentCategory) return;

      currentCategory = category;
      visibleCount = COURSES_STEP;

      tabs.forEach((item) =>
        item.classList.remove('category-filter__item--active'),
      );
      tab.classList.add('category-filter__item--active');

      renderCourses();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      searchQuery = event.target.value || '';
      visibleCount = COURSES_STEP;
      renderCourses();
    });
  }

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      visibleCount += COURSES_STEP;
      renderCourses();
    });
  }

  renderCourses();
});


