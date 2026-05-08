import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export const SOCIAL_LINKS = [
  {
    id: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/channel/UC1YOGwS9KaWbXL-RWrNih1Q",
    icon: FaYoutube,
    buttonClass: "bg-red-500 hover:bg-red-600",
    textClass: "text-red-600",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/school/ssgmceofficial/",
    icon: FaLinkedin,
    buttonClass: "bg-sky-700 hover:bg-sky-800",
    textClass: "text-sky-700",
  },
  {
    id: "x",
    label: "X",
    url: "https://x.com/AlumniSsgmce",
    icon: FaTwitter,
    buttonClass: "bg-gray-900 hover:bg-black",
    textClass: "text-gray-900",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/ssgmceofficialpage/",
    icon: FaFacebook,
    buttonClass: "bg-blue-600 hover:bg-blue-700",
    textClass: "text-blue-700",
  },
];