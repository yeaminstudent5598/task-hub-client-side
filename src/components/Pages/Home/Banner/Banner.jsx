import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <div className="bg-purple-600 px-10 dark:bg-gray-950 pt-10 text-white">
    <div className="container mx-auto  py-12 flex flex-col lg:flex-row items-center gap-12">
      {/* Mobile Hero Image */}
      <picture className="lg:hidden">
        <source
          media="(max-width: 759px)"
          srcSet="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/assignments/hero_375.png"
        />
        <source
          media="(max-width: 890px)"
          srcSet="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/assignments/hero_890.png"
        />
        <img
          className="w-full rounded-lg"
          src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/assignments/hero_890.png"
          alt="Assignments page hero"
        />
      </picture>

      {/* Hero Text Section */}
      <div className="lg:w-1/2">
        <h4 className="uppercase text-lg font-semibold">Feature: Assignments and Exams</h4>
        <h1 className="text-4xl font-bold mt-2">
          Easy-to-build assignments and exams. <br />
          Easy-to-see <em className="text-yellow-300">progress</em>.
        </h1>
        <p className="mt-4 text-lg">
          Homework assignments and assessments don’t have to stress your students out.
          When delivered in dynamic and interactive formats, they establish a learning 
          environment that helps students build confidence in their learning. 
          Top Hat makes it easy to create assignments and exams that support better 
          learning outcomes.
        </p>

        {/* Statistics */}
        <div className="mt-6 bg-white text-gray-900 p-6 rounded-lg shadow-md">
          <p className="text-4xl font-bold text-purple-600">93%</p>
          <p className="mt-2 text-sm">
            of students said the variety of assessment types in Top Hat helped them
            develop critical thinking skills<sup>1</sup>
          </p>
        </div>

        {/* Email Form */}
        <div className="mt-6">
          <form className="flex items-center border border-gray-300  rounded-lg overflow-hidden">
            <div className="relative flex-1">
              <input
                className="w-full py-3 pl-10 pr-4 bg-gray-100 text-gray-900 outline-none"
                type="email"
                placeholder="Enter your email address here"
                required
              />
              <img
                className="absolute left-3 top-3 w-6"
                src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/icons/purple-email.svg"
                alt="Email icon"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white py-3 px-6 hover:bg-purple-700 transition"
            >
              Get Started
            </button>
          </form>
        </div>

        {/* Footnote */}
        <div className="mt-4 text-sm">
          <sup>1</sup> Top Hat Research Report (2020).{" "}
          <a
            href="https://tophat.com/teaching-resources/infographics/tophat-research-report/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Report
          </a>
        </div>
      </div>

      {/* Desktop Hero Image */}
      <picture className="hidden  lg:block w-1/2">
        <img
          className="w-full rounded-lg"
          src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/assignments/hero_1920.png"
          alt="Assignments hero"
        />
        
      </picture>
    </div>

    
  </div>
  );
};

export default Banner;
