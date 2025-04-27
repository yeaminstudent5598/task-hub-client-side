import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-purple-600 px-10  dark:bg-gray-950 pt-10 text-white">
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
        <div className="mt-6 dark:text-white  text-gray-900 ">
          <p className="text-4xl font-bold">93%</p>
          <p className="mt-2 text-sm">
            of students said the variety of assessment types in Top Hat helped them
            develop critical thinking skills<sup>1</sup>
          </p>
        </div>

        

      
       
      </div>

      {/* Desktop Hero Image */}
      <picture className="hidden  lg:block w-1/2">
        <img
          className="w-full rounded-lg"
          src="https://i.ibb.co.com/jvNvCR07/hero-1920-copy.png"
        />
        
      </picture>
    </div>

    
  </div>
  );
};

export default Banner;
