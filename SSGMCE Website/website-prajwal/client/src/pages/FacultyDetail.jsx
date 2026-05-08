import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../utils/apiClient";
import GenericPage from "../components/GenericPage";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { goBackOrFallback } from "../utils/navigation";
import { logUnexpectedError } from "../utils/apiErrors";

// Import faculty data from all departments
import { APPLIED_DEFAULT_FACULTY } from "./departments/AppliedSciences";
import { defaultFaculty as CSE_DEFAULT_FACULTY } from "../data/cseDefaults";
import { defaultFaculty as ENTC_DEFAULT_FACULTY } from "../data/entcDefaults";
import { defaultFaculty as ELECTRICAL_DEFAULT_FACULTY } from "../data/electricalDefaults";
import { defaultFaculty as MBA_DEFAULT_FACULTY } from "../data/mbaDefaults";
import { defaultFaculty as MECH_DEFAULT_FACULTY } from "../data/mechanicalDefaults";
import { defaultFaculty as IT_DEFAULT_FACULTY } from "../data/itDefaults";

// Import CSE Faculty Photos for resolving photo references
import jmpPhoto from "../assets/images/departments/cse/faculty/JMP.jpg";
import nmkPhoto from "../assets/images/departments/cse/faculty/NMK.jpg";
import cmmPhoto from "../assets/images/departments/cse/faculty/CMM.jpeg";
import vsmPhoto from "../assets/images/departments/cse/faculty/VSM.jpg";
import pkbPhoto from "../assets/images/departments/cse/faculty/PKB.jpg";
import kpsPhoto from "../assets/images/departments/cse/faculty/KPS.jpg";
import sbpPhoto from "../assets/images/departments/cse/faculty/SBPagrut.jpg";
import razPhoto from "../assets/images/departments/cse/faculty/RAZamare.jpg";
import prpPhoto from "../assets/images/departments/cse/faculty/PRPohare.jpeg";
import rvdPhoto from "../assets/images/departments/cse/faculty/RVD.jpeg";
import smjPhoto from "../assets/images/departments/cse/faculty/SMJawake.png";
import tapPhoto from "../assets/images/departments/cse/faculty/TAP.jpeg";
import vskPhoto from "../assets/images/departments/cse/faculty/VSK.jpeg";
import yogeshPhoto from "../assets/images/departments/cse/faculty/YogeshMurumkar.jpeg";

// Import ENTC Faculty Photos
import dnPhoto from "../assets/images/departments/electronics/faculty/DN.jpg";
import kbkPhoto from "../assets/images/departments/electronics/faculty/KBK.jpg";
import rsdPhoto from "../assets/images/departments/electronics/faculty/RSD.jpg";
import mntPhoto from "../assets/images/departments/electronics/faculty/MNT.jpg";
import sbpEntcPhoto from "../assets/images/departments/electronics/faculty/SBP.jpg";
import vmuPhoto from "../assets/images/departments/electronics/faculty/VMU.jpg";
import dlbPhoto from "../assets/images/departments/electronics/faculty/DLB.jpg";
import bphPhoto from "../assets/images/departments/electronics/faculty/BPH.jpg";
import dptPhoto from "../assets/images/departments/electronics/faculty/DPT.jpg";
import andPhoto from "../assets/images/departments/electronics/faculty/AND.jpg";
import vkbPhoto from "../assets/images/departments/electronics/faculty/VKB.jpg";
import ktkPhoto from "../assets/images/departments/electronics/faculty/KTK.jpg";
import ksvPhoto from "../assets/images/departments/electronics/faculty/KSV.jpg";
import spbPhoto from "../assets/images/departments/electronics/faculty/SPB.jpg";
import tpmPhoto from "../assets/images/departments/electronics/faculty/TPM.jpg";
import sgnPhoto from "../assets/images/departments/electronics/faculty/SGN.jpg";
import vsiPhoto from "../assets/images/departments/electronics/faculty/VSI.jpg";
import aadPhoto from "../assets/images/departments/electronics/faculty/AAD.jpg";
import hbpPhoto from "../assets/images/departments/electronics/faculty/HBP.jpeg";
import rsmPhoto from "../assets/images/departments/electronics/faculty/RSM.jpeg";
import nsdPhoto from "../assets/images/departments/electronics/faculty/NSD.jpeg";
import mbdPhoto from "../assets/images/departments/electronics/faculty/MBD.jpeg";
import spsPhoto from "../assets/images/departments/electronics/faculty/SPS.jpeg";
import gkPhoto from "../assets/images/departments/electronics/faculty/GK.jpeg";

// Import Electrical Faculty Photos
import elecSrpPhoto from "../assets/images/departments/electrical/faculty/SRP.jpg";
import elecUajPhoto from "../assets/images/departments/electrical/faculty/UAJ.jpg";
import elecAujPhoto from "../assets/images/departments/electrical/faculty/AUJ.jpg";
import elecSsjPhoto from "../assets/images/departments/electrical/faculty/SSJ.jpg";
import elecPrbPhoto from "../assets/images/departments/electrical/faculty/PRB.jpg";
import elecRskPhoto from "../assets/images/departments/electrical/faculty/RSKankale.jpg";
import elecMrcPhoto from "../assets/images/departments/electrical/faculty/MRC.jpg";
import elecRkmPhoto from "../assets/images/departments/electrical/faculty/RKM.jpg";
import elecGnbPhoto from "../assets/images/departments/electrical/faculty/GNBonde.jpg";
import elecVskPhoto from "../assets/images/departments/electrical/faculty/VSKarale.jpg";
import elecBsrPhoto from "../assets/images/departments/electrical/faculty/BSRakhonde.jpg";
import elecPrdPhoto from "../assets/images/departments/electrical/faculty/PratikDhabe.jpg";
import elecVanPhoto from "../assets/images/departments/electrical/faculty/vanagpure.png";
import elecGdkPhoto from "../assets/images/departments/electrical/faculty/GDKhadsane.jpg";

// Import MBA Faculty Photos
import mbapmkPhoto from "../assets/images/departments/mba/faculty/PMK.jpg";
import mbaLbdPhoto from "../assets/images/departments/mba/faculty/LBDeshmukh.jpg";
import mbaMadPhoto from "../assets/images/departments/mba/faculty/MADande.jpg";
import mbaSsmPhoto from "../assets/images/departments/mba/faculty/SSMishra.jpg";
import mbaVvpPhoto from "../assets/images/departments/mba/faculty/VVPatil.jpg";
import mbaWzsPhoto from "../assets/images/departments/mba/faculty/WZSuliya.jpg";
import mbaBhPhoto from "../assets/images/departments/mba/faculty/BilalHusain.jpg";
import mbaAbsPhoto from "../assets/images/departments/mba/faculty/AdeshSolanke.jpg";
import mbaUpPhoto from "../assets/images/departments/mba/faculty/UdayPatil.jpg";
import mbaMmPhoto from "../assets/images/departments/mba/faculty/MohiniModak.jpg";

// Import Mechanical Faculty Photos
import mechSptPhoto from "../assets/images/departments/mechanical/faculty/SPT.jpg";
import mechVktPhoto from "../assets/images/departments/mechanical/faculty/VKThute.jpg";
import mechJgkPhoto from "../assets/images/departments/mechanical/faculty/Dr_JGKhan.jpg";
import mechMbbPhoto from "../assets/images/departments/mechanical/faculty/MBB.jpg";
import mechCvpPhoto from "../assets/images/departments/mechanical/faculty/CVPatil.jpg";
import mechAsbPhoto from "../assets/images/departments/mechanical/faculty/ASB.jpg";
import mechNbbPhoto from "../assets/images/departments/mechanical/faculty/NBBorkar.jpg";
import mechNhkPhoto from "../assets/images/departments/mechanical/faculty/NHK.jpeg";
import mechSqsPhoto from "../assets/images/departments/mechanical/faculty/SQSyed.jpg";
import mechPtpPhoto from "../assets/images/departments/mechanical/faculty/PTPatokar.jpg";
import mechKvcPhoto from "../assets/images/departments/mechanical/faculty/KVC.jpg";
import mechPdPhoto from "../assets/images/departments/mechanical/faculty/PiyushDalke.jpg";
import mechKrdPhoto from "../assets/images/departments/mechanical/faculty/KRDhudhe.jpg";
import mechSpjPhoto from "../assets/images/departments/mechanical/faculty/SPJ.jpg";
import mechGswPhoto from "../assets/images/departments/mechanical/faculty/ASB.jpg";
import mechVtmPhoto from "../assets/images/departments/mechanical/faculty/VTMhaske.jpg";
import mechPjPhoto from "../assets/images/departments/mechanical/faculty/Parag Jadhav.png";

// Import IT Faculty Photos
import itSdpPhoto from "../assets/images/departments/it/faculty/SDPadiya.jpg";
import itAsmPhoto from "../assets/images/departments/it/faculty/ASM.png";
import itPvkPhoto from "../assets/images/departments/it/faculty/PVK.jpg";
import itAgsPhoto from "../assets/images/departments/it/faculty/AGS.jpg";
import itFikPhoto from "../assets/images/departments/it/faculty/FIK.jpg";
import itSsmPhoto from "../assets/images/departments/it/faculty/SSM.jpg";
import itPpbPhoto from "../assets/images/departments/it/faculty/PallaviBute.jpg";
import itSnkPhoto from "../assets/images/departments/it/faculty/SNK.jpg";
import itNngPhoto from "../assets/images/departments/it/faculty/NNG.jpg";
import itPalPhoto from "../assets/images/departments/it/faculty/PALod.jpeg";
import itKpPhoto from "../assets/images/departments/it/faculty/KP.jpeg";

// Photo map for resolving CSE faculty photo string references
const csePhotoMap = {
  jmpPhoto,
  nmkPhoto,
  cmmPhoto,
  vsmPhoto,
  pkbPhoto,
  kpsPhoto,
  sbpPhoto,
  razPhoto,
  prpPhoto,
  rvdPhoto,
  smjPhoto,
  tapPhoto,
  vskPhoto,
  yogeshPhoto,
};

// Photo map for resolving ENTC faculty photo string references
const entcPhotoMap = {
  DN: dnPhoto,
  KBK: kbkPhoto,
  RSD: rsdPhoto,
  MNT: mntPhoto,
  SBP: sbpEntcPhoto,
  VMU: vmuPhoto,
  DLB: dlbPhoto,
  BPH: bphPhoto,
  DPT: dptPhoto,
  AND: andPhoto,
  VKB: vkbPhoto,
  KTK: ktkPhoto,
  KSV: ksvPhoto,
  SPB: spbPhoto,
  TPM: tpmPhoto,
  SGN: sgnPhoto,
  VSI: vsiPhoto,
  AAD: aadPhoto,
  HBP: hbpPhoto,
  RSM: rsmPhoto,
  NSD: nsdPhoto,
  MBD: mbdPhoto,
  SPS: spsPhoto,
  GK: gkPhoto,
};

// Photo map for resolving Electrical faculty photo string references
const electricalPhotoMap = {
  SRP: elecSrpPhoto,
  UAJ: elecUajPhoto,
  AUJ: elecAujPhoto,
  SSJ: elecSsjPhoto,
  PRB: elecPrbPhoto,
  RSK: elecRskPhoto,
  MRC: elecMrcPhoto,
  RKM: elecRkmPhoto,
  GNB: elecGnbPhoto,
  VSK: elecVskPhoto,
  BSR: elecBsrPhoto,
  PRD: elecPrdPhoto,
  VAN: elecVanPhoto,
  GDK: elecGdkPhoto,
};

// Photo map for resolving MBA faculty photo string references
const mbaPhotoMap = {
  PMK: mbapmkPhoto,
  LBD: mbaLbdPhoto,
  MAD: mbaMadPhoto,
  SMM: mbaSsmPhoto,
  VVP: mbaVvpPhoto,
  WZS: mbaWzsPhoto,
  BH: mbaBhPhoto,
  ABS: mbaAbsPhoto,
  UP: mbaUpPhoto,
  MMM: mbaMmPhoto,
};

// Photo map for resolving Mechanical faculty photo string references
const mechPhotoMap = {
  SPT: mechSptPhoto,
  VKT: mechVktPhoto,
  JGK: mechJgkPhoto,
  MBB: mechMbbPhoto,
  CVP: mechCvpPhoto,
  ASB: mechAsbPhoto,
  NBB: mechNbbPhoto,
  NHK: mechNhkPhoto,
  SQS: mechSqsPhoto,
  PTP: mechPtpPhoto,
  KVC: mechKvcPhoto,
  PD: mechPdPhoto,
  KRD: mechKrdPhoto,
  SPJ: mechSpjPhoto,
  GSW: mechGswPhoto,
  VTM: mechVtmPhoto,
  PJ: mechPjPhoto,
};

// Photo map for resolving IT faculty photo string references
const itPhotoMap = {
  SDP: itSdpPhoto,
  ASM: itAsmPhoto,
  PVK: itPvkPhoto,
  AGS: itAgsPhoto,
  FIK: itFikPhoto,
  SSM: itSsmPhoto,
  PPB: itPpbPhoto,
  SNK: itSnkPhoto,
  NNG: itNngPhoto,
  PAL: itPalPhoto,
  KP: itKpPhoto,
};

const createFacultySlug = (value = "") =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeArea = (value) => {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeFacultyCollection = (items = [], department, photoMap = {}) =>
  (Array.isArray(items) ? items : []).map((facultyMember) => {
    const normalized = {
      ...facultyMember,
      department: facultyMember.department || department,
      id:
        facultyMember.id ||
        createFacultySlug(facultyMember.name || facultyMember.email || ""),
      photo: photoMap[facultyMember.photo] || facultyMember.photo,
    };

    normalized.role =
      facultyMember.role || facultyMember.designation || normalized.role || "";
    normalized.designation =
      facultyMember.designation || facultyMember.role || normalized.role || "";
    normalized.area = normalizeArea(
      facultyMember.area || facultyMember.specialization || "",
    );
    normalized.specialization =
      facultyMember.specialization || normalized.area.join(", ");

    return normalized;
  });

// Resolve CSE faculty photos from string references to actual imports
const resolvedCseFaculty = normalizeFacultyCollection(
  CSE_DEFAULT_FACULTY,
  "cse",
  csePhotoMap,
);

// Resolve ENTC faculty photos from string references to actual imports
const resolvedEntcFaculty = normalizeFacultyCollection(
  ENTC_DEFAULT_FACULTY,
  "entc",
  entcPhotoMap,
);

// Resolve Electrical faculty photos from string references to actual imports
const resolvedElectricalFaculty = normalizeFacultyCollection(
  ELECTRICAL_DEFAULT_FACULTY,
  "electrical",
  electricalPhotoMap,
);

// Resolve MBA faculty photos from string references to actual imports
const resolvedMbaFaculty = normalizeFacultyCollection(
  MBA_DEFAULT_FACULTY,
  "mba",
  mbaPhotoMap,
);

// Resolve Mechanical faculty photos from string references to actual imports
const resolvedMechFaculty = normalizeFacultyCollection(
  MECH_DEFAULT_FACULTY,
  "mechanical",
  mechPhotoMap,
);

// Resolve IT faculty photos from string references to actual imports
const resolvedItFaculty = normalizeFacultyCollection(
  IT_DEFAULT_FACULTY,
  "it",
  itPhotoMap,
);

const resolveCseFacultyItems = (items = []) =>
  normalizeFacultyCollection(items, "cse", csePhotoMap);

const PHOTO_MAP_BY_DEPT = {
  cse: csePhotoMap,
  entc: entcPhotoMap,
  electrical: electricalPhotoMap,
  mba: mbaPhotoMap,
  mechanical: mechPhotoMap,
  it: itPhotoMap,
};

export const getVidwanUrl = (facultyMember) => {
  if (!facultyMember || typeof facultyMember !== "object") return "";

  const directLink =
    typeof facultyMember.vidwanLink === "string"
      ? facultyMember.vidwanLink.trim()
      : "";
  if (directLink) return directLink;

  const vidwanId =
    typeof facultyMember.vidwanId === "string"
      ? facultyMember.vidwanId.trim()
      : "";
  if (vidwanId) return `https://vidwan.inflibnet.ac.in/profile/${vidwanId}`;

  return "";
};

// Department name mapping
export const DEPARTMENT_MAP = {
  cse: "Dept. of Computer Science & Engineering",
  applied: "Dept. of Applied Sciences & Humanities",
  entc: "Dept. of Electronics & Telecommunication Engg.",
  electrical: "Dept. of Electrical Engineering (Electronics & Power)",
  mba: "Dept. of Business Administration and Research (MBA)",
  mechanical: "Dept. of Mechanical Engineering",
  it: "Dept. of Information Technology",
};

export const FACULTY_DIRECTORY_DEPARTMENTS = [
  { id: "all", label: "All Departments" },
  { id: "applied", label: "Applied Sciences & Humanities" },
  { id: "cse", label: "Computer Science & Engineering" },
  { id: "it", label: "Information Technology" },
  { id: "entc", label: "Electronics & Telecommunication" },
  { id: "electrical", label: "Electrical Engineering" },
  { id: "mechanical", label: "Mechanical Engineering" },
  { id: "mba", label: "Business Administration" },
];

const buildFacultyDirectory = (liveFacultyByDept = {}) => [
  ...(liveFacultyByDept.applied?.length
    ? liveFacultyByDept.applied
    : normalizeFacultyCollection(APPLIED_DEFAULT_FACULTY, "applied")),
  ...(liveFacultyByDept.cse?.length ? liveFacultyByDept.cse : resolvedCseFaculty),
  ...(liveFacultyByDept.entc?.length ? liveFacultyByDept.entc : resolvedEntcFaculty),
  ...(liveFacultyByDept.electrical?.length
    ? liveFacultyByDept.electrical
    : resolvedElectricalFaculty),
  ...(liveFacultyByDept.mba?.length ? liveFacultyByDept.mba : resolvedMbaFaculty),
  ...(liveFacultyByDept.mechanical?.length
    ? liveFacultyByDept.mechanical
    : resolvedMechFaculty),
  ...(liveFacultyByDept.it?.length ? liveFacultyByDept.it : resolvedItFaculty),
];

export const useFacultyDirectoryData = () => {
  const [liveFacultyByDept, setLiveFacultyByDept] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadLiveFaculty = async () => {
      try {
        const pageRequests = [
          ["cse", "/api/pages/departments-cse"],
          ["entc", "/api/pages/departments-entc"],
          ["it", "/api/pages/departments-it"],
          ["electrical", "/api/pages/departments-electrical"],
          ["mechanical", "/api/pages/departments-mechanical"],
          ["mba", "/api/pages/departments-mba"],
          ["applied", "/api/pages/departments-applied-sciences"],
        ];

        const responses = await Promise.allSettled(
          pageRequests.map(([, url]) => apiClient.get(url)),
        );

        if (!isMounted) return;

        const nextLiveFaculty = {};

        responses.forEach((result, index) => {
          if (result.status !== "fulfilled") return;

          const [dept] = pageRequests[index];
          const data = result.value?.data?.data || {};
          const storedFaculty =
            dept === "cse"
              ? data.faculty
              : dept === "entc"
                ? data.templateData?.faculty?.list
                : dept === "electrical"
                  ? data.templateData?.facultyData
                  : data.templateData?.faculty;

          if (!Array.isArray(storedFaculty) || storedFaculty.length === 0) {
            return;
          }

          nextLiveFaculty[dept] = normalizeFacultyCollection(
            storedFaculty,
            dept,
            PHOTO_MAP_BY_DEPT[dept] || {},
          );
        });

        setLiveFacultyByDept(nextLiveFaculty);
      } catch (error) {
        logUnexpectedError("Error loading live faculty data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLiveFaculty();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    facultyDirectory: buildFacultyDirectory(liveFacultyByDept),
    liveFacultyByDept,
    loading,
  };
};

// Table row component for clean, consistent display
const InfoRow = ({ label, children, borderColor = "border-blue-600" }) => {
  if (!children) return null;
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
      <td
        className={`py-4 px-5 font-semibold text-gray-800 text-sm uppercase tracking-wide align-top w-[260px] bg-gray-50/80 border-l-4 ${borderColor}`}
      >
        {label}
      </td>
      <td className="py-4 px-6 text-gray-700 text-sm leading-relaxed align-top">
        {children}
      </td>
    </tr>
  );
};

const FacultyDetail = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [faculty, setFaculty] = useState(null);
  const { facultyDirectory, loading } = useFacultyDirectoryData();

  useEffect(() => {
    const foundFaculty = facultyDirectory.find((f) => f.id === facultyId);
    if (foundFaculty) {
      setFaculty(foundFaculty);
    } else {
      setFaculty(null);
    }
  }, [facultyId, facultyDirectory]);

  if (loading && !faculty) {
    return (
      <GenericPage title="Faculty Directory">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ssgmce-blue"></div>
          <p className="mt-4 text-gray-600">Loading faculty profile...</p>
        </div>
      </GenericPage>
    );
  }

  if (!faculty) {
    return (
      <GenericPage title="Faculty Not Found">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Faculty Member Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The faculty member you're looking for doesn't exist or has been
            removed.
          </p>
          <button
            type="button"
            onClick={() => goBackOrFallback(navigate, location, "/faculty")}
            className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Faculty
          </button>
        </div>
      </GenericPage>
    );
  }

  const hasPublications =
    faculty.publications && faculty.publications.length > 0;
  const hasMembership = faculty.membership && faculty.membership.length > 0;
  const hasFellowship = faculty.fellowship && faculty.fellowship.length > 0;
  const hasAchievements =
    faculty.achievements && faculty.achievements.length > 0;
  const hasCourses = faculty.coursesTaught && faculty.coursesTaught.length > 0;
  const hasArea = faculty.area && faculty.area.length > 0;

  return (
    <GenericPage title={faculty.name}>
      <div className="bg-gray-100 min-h-screen">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <button
              onClick={() => goBackOrFallback(navigate, location, "/faculty")}
              className="inline-flex items-center text-blue-200 hover:text-white text-sm transition-colors"
            >
              <FaArrowLeft className="mr-2 text-xs" />
              Back to Faculty
            </button>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row gap-6"
          >
            {/* ─── Left Sidebar: Photo & Contact ─── */}
            <div className="lg:w-[300px] flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                {/* Photo */}
                <div className="bg-gradient-to-b from-blue-900 to-blue-800 p-6 flex flex-col items-center">
                  <div className="w-44 h-56 rounded-lg overflow-hidden border-4 border-white/30 shadow-xl mb-4 bg-white">
                    {faculty.photo ? (
                      <img
                        src={faculty.photo}
                        alt={faculty.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-700">
                        <FaUserTie className="text-5xl text-blue-300" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white text-center leading-tight">
                    {faculty.name}
                  </h2>
                  <p className="text-blue-200 text-sm text-center mt-1">
                    {faculty.role}
                  </p>
                  <p className="text-blue-300 text-xs text-center mt-1">
                    {DEPARTMENT_MAP[faculty.department] ||
                      "Dept. of Applied Sciences & Humanities"}
                  </p>
                </div>

                {/* Contact Details */}
                <div className="p-5 space-y-3 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Contact Information
                  </h3>
                  {faculty.email && (
                    <a
                      href={`mailto:${faculty.email}`}
                      className="flex items-start gap-3 text-sm text-gray-700 hover:text-blue-700 transition-colors group"
                    >
                      <FaEnvelope className="mt-0.5 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                      <span className="break-all">{faculty.email}</span>
                    </a>
                  )}
                  {faculty.phone && (
                    <a
                      href={`tel:${faculty.phone}`}
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-700 transition-colors group"
                    >
                      <FaPhone className="text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                      <span>{faculty.phone}</span>
                    </a>
                  )}
                </div>

                {/* Vidwan Profile Link */}
                {getVidwanUrl(faculty) && (
                  <div className="px-5 pb-5">
                    <a
                      href={getVidwanUrl(faculty)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      View Vidwan Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* ─── Right Content: Detailed Information Table ─── */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Title Bar */}
                <div className="bg-blue-900 px-6 py-4">
                  <h1 className="text-xl font-bold text-white">
                    {faculty.name}
                  </h1>
                  <p className="text-blue-200 text-sm mt-0.5">{faculty.role}</p>
                </div>

                {/* Info Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      <InfoRow label="Academic Qualification">
                        {faculty.qualification}
                      </InfoRow>

                      <InfoRow
                        label="Area of Specialization"
                        borderColor="border-emerald-600"
                      >
                        {hasArea && faculty.area.join(", ")}
                      </InfoRow>

                      <InfoRow
                        label="Experience"
                        borderColor="border-amber-600"
                      >
                        {faculty.experience}
                      </InfoRow>

                      <InfoRow
                        label="Courses Taught"
                        borderColor="border-purple-600"
                      >
                        {hasCourses && faculty.coursesTaught.join(", ")}
                      </InfoRow>

                      <InfoRow
                        label={
                          <>
                            ORCID ID / SCOPUS ID /
                            <br />
                            VIDWAN ID / Google Scholar
                          </>
                        }
                        borderColor="border-indigo-600"
                      >
                        {getVidwanUrl(faculty) ? (
                          <div className="space-y-1">
                            <span>
                              <a
                                href={getVidwanUrl(faculty)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline font-medium inline-flex items-center gap-1"
                              >
                                View Vidwan Profile{" "}
                                <FaExternalLinkAlt className="text-xs" />
                              </a>
                            </span>
                            {faculty.scholarIds &&
                              faculty.scholarIds
                                .split("|")
                                .map((s) => s.trim())
                                .filter(
                                  (s) =>
                                    s && !s.toLowerCase().startsWith("vidwan"),
                                )
                                .map((part, i) => (
                                  <div key={i}>
                                    {part.includes("http") ? (
                                      <a
                                        href={part.match(/https?:\/\/\S+/)?.[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:underline"
                                      >
                                        {part}
                                      </a>
                                    ) : (
                                      part
                                    )}
                                  </div>
                                ))}
                          </div>
                        ) : (
                          faculty.scholarIds || null
                        )}
                      </InfoRow>

                      <InfoRow label="Membership" borderColor="border-teal-600">
                        {hasMembership && (
                          <ul className="space-y-1.5">
                            {faculty.membership.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </InfoRow>

                      <InfoRow
                        label="Publications"
                        borderColor="border-orange-600"
                      >
                        {hasPublications && (
                          <ul className="space-y-2">
                            {faculty.publications.map((pub, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-0.5 min-w-[22px] h-[22px] bg-orange-100 text-orange-700 rounded text-xs font-bold flex items-center justify-center flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span>{pub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </InfoRow>

                      <InfoRow
                        label="Research & Development"
                        borderColor="border-red-600"
                      >
                        {faculty.research || null}
                      </InfoRow>

                      <InfoRow
                        label="Research Guidance"
                        borderColor="border-red-500"
                      >
                        {null}
                      </InfoRow>

                      <InfoRow
                        label={
                          <>
                            FDP / STTP / Workshop /
                            <br />
                            Training Programme
                          </>
                        }
                        borderColor="border-cyan-600"
                      >
                        {faculty.fdp || null}
                      </InfoRow>

                      <InfoRow
                        label="Fellowship / Awards"
                        borderColor="border-amber-500"
                      >
                        {hasFellowship && (
                          <ul className="space-y-1.5">
                            {faculty.fellowship.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </InfoRow>

                      <InfoRow label="Other" borderColor="border-gray-500">
                        {hasAchievements && (
                          <ul className="space-y-1.5">
                            {faculty.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0" />
                                {ach}
                              </li>
                            ))}
                          </ul>
                        )}
                      </InfoRow>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GenericPage>
  );
};

// Export the faculty data for use in other components
export { APPLIED_DEFAULT_FACULTY, resolveCseFacultyItems };
export default FacultyDetail;
