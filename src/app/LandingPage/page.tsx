import LDNavbar from "@/components/LDNavbar";
import Hero from "@/components/Hero";
import Features from "@/components/Feature";
import CourseList from "@/components/CourseList";
import LDFAQSection from "@/components/LDSection";
import LDFooter from "@/components/LDFooter";

function LandingPage() {
  return (
    <div className="font-sans text-gray-800 ">
      <LDNavbar />
      <Hero />
      <Features />
      <CourseList />
      <LDFAQSection />
      <LDFooter />
    </div>
  );
}

export default LandingPage;
