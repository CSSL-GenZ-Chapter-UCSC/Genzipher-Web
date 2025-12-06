"use client";
import React, { useState, useEffect, useRef } from "react";
import { formSchema } from "@/utils/validate";
import Link from "next/link";
import Button from "./button";

const universityList = [
  "University of Colombo School of Computing (UCSC)",
  "University of Moratuwa",
  "University of Peradeniya",
  "University of Colombo",
  "University of Sri Jayewardenepura",
  "University of Jaffna",
  "University of Kelaniya",
  "University of Ruhuna",
  "University of Vavuniya",
  "Rajarata University",
  "Sabaragamuva University",
  "South Eastern University",
  "Eastern University",
  "Uva Wellassa University",
  "Wayamba University",
  "University of Vocational Technology (UNIVOTEC)",
  "Informatics Institute of Technology (IIT)",
  "Sri Lanka Institute of Information Technology (SLIIT)",
  "National Institute of Business Management (NIBM)",
  "NSBM Green University",
  "International College of Business and Technology (ICBT)",
  "General Sir John Kotelawala Defence University (KDU)",
  "Sri Lanka Technological Campus (SLTC)",
  "Esoft",
  "KAATSU International University (KIU)",
  "Open University of Sri Lanka (OUSL)",
  "Aquinas College",
  "Horizon Campus",
  "Other",
];

const UniversityInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const isOther = value && !universityList.includes(value);
  const [showOtherInput, setShowOtherInput] = useState(isOther);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shouldShowOther = value && !universityList.includes(value);
    setShowOtherInput(shouldShowOther);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredUniversities = universityList.filter((uni) =>
    uni.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === "Other") {
      setShowOtherInput(true);
      onChange("");
    } else {
      setShowOtherInput(false);
      onChange(selectedValue);
    }

    setIsOpen(false);
    setQuery("");
  };

  const displayValue = showOtherInput ? value || "Other" : value;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setQuery("");
        }}
        className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e] flex items-center justify-between border border-transparent hover:border-[#e0a82e]/40 transition"
      >
        <span
          className={`text-left ${
            displayValue ? "text-white" : "text-gray-400"
          }`}
        >
          {displayValue || "Select a university"}
        </span>
        <span
          className={`text-xs text-gray-400 transition-transform ${
            isOpen ? "-rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-[#1f1c19] border border-[#3b332d] rounded-lg shadow-2xl z-20 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#3b332d]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4 text-gray-400"
            >
              <circle cx="9" cy="9" r="6" strokeWidth="1.5" />
              <path strokeWidth="1.5" strokeLinecap="round" d="m13 13 3 3" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search universities..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filteredUniversities.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400">
                No matches found
              </div>
            ) : (
              filteredUniversities.map((uni) => (
                <button
                  type="button"
                  key={uni}
                  onClick={() => handleSelect(uni)}
                  className={`w-full text-left px-4 py-3 text-sm transition hover:bg-[#2b2825] ${
                    value === uni ? "text-[#e0a82e]" : "text-gray-200"
                  }`}
                >
                  {uni}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {showOtherInput && (
        <input
          type="text"
          placeholder="Please specify your university"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e] mt-2"
        />
      )}
    </div>
  );
};

// Helper component for error display
const FieldError = ({ error }: { error?: string[] }) => {
  if (!error || error.length === 0) return null;
  return <p className="text-red-500 text-xs mt-1 ml-1">{error[0]}</p>;
};

export default function Register() {
  const [teamSize, setTeamSize] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  // Added state for specific field errors
  const [validationErrors, setValidationErrors] = useState<any>({});

  const [success, setSuccess] = useState(false);
  const [allSameUniversity, setAllSameUniversity] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error.length > 0 || Object.keys(validationErrors).length > 0) {
      timer = setTimeout(() => {
        setError([]);
        // We generally don't clear form validation errors on timeout (users need to see what to fix),
        // but if you want to keep consistent behavior with previous logic, you can uncomment below:
        // setValidationErrors({});
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error, validationErrors]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowScrollHint(false);
      return;
    }

    const node = formRef.current;
    if (!node) return;

    setShowScrollHint(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollHint(!entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: "3",
    leader: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      studentId: "",
      yearOfStudy: "",
    },
    members: Array(3).fill({
      fullName: "",
      email: "",
      phone: "",
      university: "",
      studentId: "",
      yearOfStudy: "",
    }),
  });

  useEffect(() => {
    if (!allSameUniversity) return;

    setFormData((prev) => {
      if (!prev.leader.university) return prev;

      return {
        ...prev,
        members: prev.members.map((member) => ({
          ...member,
          university: prev.leader.university,
        })),
      };
    });
  }, [allSameUniversity, formData.leader.university]);

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setTeamSize(size);
    setFormData({ ...formData, teamSize: e.target.value });
  };

  const handleLeaderChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      leader: {
        ...prev.leader,
        [field]: value,
      },
    }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };

    if (field === "university" && allSameUniversity) {
      if (value !== formData.leader.university) {
        setAllSameUniversity(false);
      }
    }

    setFormData({ ...formData, members: newMembers });
  };

  const handleSameUniversityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setAllSameUniversity(isChecked);
  };

  const validateForm = () => {
    const dataToValidate = {
      ...formData,
      teamSize: formData.teamSize,
      members: formData.members.slice(0, teamSize - 1),
    };

    const result = formSchema.safeParse(dataToValidate);

    if (!result.success) {
      // Changed to use format() to get structured errors
      setValidationErrors(result.error.format());
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const handleSubmit = async () => {
    setError([]);
    setSuccess(false);

    // Update to check boolean return
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const teamMembers = [
        formData.leader,
        ...formData.members.slice(0, teamSize - 1),
      ];

      const sheetData = {
        teamName: formData.teamName,
        teamSize: formData.teamSize,
        ...teamMembers.reduce((acc, member, index) => {
          const prefix = index === 0 ? "leader" : `member${index}`;
          return {
            ...acc,
            [`${prefix}FullName`]: member.fullName,
            [`${prefix}Email`]: member.email,
            [`${prefix}Phone`]: member.phone,
            [`${prefix}University`]: member.university,
            [`${prefix}StudentId`]: member.studentId,
            [`${prefix}YearOfStudy`]: member.yearOfStudy,
          };
        }, {}),
      };

      const response = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setError(result.errors.map((e: any) => e.message));
          return;
        }

        throw new Error(result.error || "Failed to submit form");
      }

      setSuccess(true);
      setFormData({
        teamName: "",
        teamSize: "3",
        leader: {
          fullName: "",
          email: "",
          phone: "",
          university: "",
          studentId: "",
          yearOfStudy: "",
        },
        members: Array(3).fill({
          fullName: "",
          email: "",
          phone: "",
          university: "",
          studentId: "",
          yearOfStudy: "",
        }),
      });
      setTeamSize(3);
      setAllSameUniversity(false);
    } catch (err: any) {
      console.log(err);
      setError([err.message || "An error occurred while submitting the form"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0d08] text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl flex items-center justify-start mb-6 md:mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1f1c19] text-[#e0a82e] border border-[#e0a82e]/50 rounded-full px-4 py-2 text-sm md:text-base font-semibold shadow-lg shadow-black/20 hover:bg-[#2b2825] hover:border-[#f2c14e] hover:text-[#f2c14e] transition-colors"
        >
          <span className="text-lg" aria-hidden="true">
            ←
          </span>
          <span className="tracking-wide">Back to Home</span>
        </Link>
      </div>

      {/* Global Error Display (Keep for Server Errors) */}
      {Array.isArray(error) && error.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-red-600 text-white rounded-xl p-4 shadow-lg z-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold mb-2">
                Please fix the following errors:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {error.map((err, i) => (
                  <li key={i} className="text-sm">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setError([])}
              className="ml-4 text-white font-bold text-2xl leading-none hover:opacity-75"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <section className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-6 text-white">
          Competition Guidelines
        </h2>

        <div className="space-y-10 text-sm md:text-base text-gray-200 leading-relaxed">
          {/* Competition Overview */}
          <div>
            <h3 className="text-[#e0a82e] font-semibold mb-2">
              Competition Overview
            </h3>
            <p>
              GenZipher is the signature hackathon by the{" "}
              <span className="font-semibold">CSSL GenZ Chapter of UCSC</span>,
              combining AI-assisted development, innovative coding, and
              security-focused challenges. Centered around a real-world problem
              statement, it encourages participants to explore Artificial
              Intelligence in creating practical and efficient solutions,
              strengthening coding, algorithmic thinking, teamwork, and
              full-cycle solution design.
            </p>
          </div>

          {/* Team Composition Requirements */}
          <div>
            <h3 className="text-[#e0a82e] font-semibold mb-2">
              Team Composition Requirements
            </h3>

            <p>
              Teams must consist of 3–4 members. A diverse skill set is
              recommended due to the competition's varied challenges.
            </p>

            <p className="mt-3 font-semibold text-gray-300">
              Recommended roles:
            </p>
            <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
              <li>
                Web Developer / Engineer – frontend, backend, or full-stack.
              </li>
              <li>
                Cybersecurity Specialist – for CTF and security-related tasks.
              </li>
              <li>
                Programmer / Coder – strong in problem-solving and algorithms.
              </li>
            </ul>

            <p className="mt-4 font-semibold text-gray-300">
              Optional but beneficial roles:
            </p>
            <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
              <li>UI/UX Designer – improve product usability and design.</li>
              <li>DevOps Engineer – deployment, CI/CD, automation.</li>
              <li>Project Lead – plan, organize and manage team workflow.</li>
            </ul>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-[#e0a82e] font-semibold mb-2">Eligibility</h3>

            <p>
              The competition is open to undergraduate students from state and
              private universities.
            </p>
            <ul className="list-disc list-inside ml-3 mt-1 space-y-1">
              <li>All members must register under one team name.</li>
              <li>No participant may join more than one team.</li>
            </ul>
          </div>
        </div>
      </section>

      <section ref={formRef} className="w-full max-w-5xl" id="reg-form">
        <section className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
            Team Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) =>
                  setFormData({ ...formData, teamName: e.target.value })
                }
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              />
              <FieldError error={validationErrors?.teamName?._errors} />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Team Size
              </label>
              <select
                value={formData.teamSize}
                onChange={handleTeamSizeChange}
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              >
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Team Leader Details
            </h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sameUni"
                checked={allSameUniversity}
                onChange={handleSameUniversityChange}
                className="w-4 h-4 text-[#e0a82e] bg-[#1f1c19] border-gray-600 rounded focus:ring-offset-0 focus:ring-1 focus:ring-[#e0a82e]"
              />
              <label htmlFor="sameUni" className="ml-2 text-sm text-gray-300">
                All members from the same university?
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.leader.fullName}
                onChange={(e) => handleLeaderChange("fullName", e.target.value)}
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              />
              <FieldError
                error={validationErrors?.leader?.fullName?._errors}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.leader.email}
                onChange={(e) => handleLeaderChange("email", e.target.value)}
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              />
              <FieldError error={validationErrors?.leader?.email?._errors} />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Phone Number
              </label>
              <div className="flex items-center">
                <span className="bg-[#1f1c19] px-3 py-2 rounded-l-md border-r border-gray-600 text-gray-400 text-sm">
                  +94
                </span>
                <input
                  type="text"
                  value={formData.leader.phone}
                  onChange={(e) =>
                    handleLeaderChange("phone", e.target.value)
                  }
                  className="flex-1 bg-[#1f1c19] rounded-r-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
                />
              </div>
              <FieldError error={validationErrors?.leader?.phone?._errors} />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                University / Institution Name
              </label>
              <UniversityInput
                value={formData.leader.university}
                onChange={(value) => handleLeaderChange("university", value)}
              />
              <FieldError
                error={validationErrors?.leader?.university?._errors}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Student ID Number
              </label>
              <input
                type="text"
                value={formData.leader.studentId}
                onChange={(e) =>
                  handleLeaderChange("studentId", e.target.value)
                }
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              />
              <FieldError
                error={validationErrors?.leader?.studentId?._errors}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Year of Study
              </label>
              <select
                value={formData.leader.yearOfStudy}
                onChange={(e) =>
                  handleLeaderChange("yearOfStudy", e.target.value)
                }
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              >
                <option value="">Select</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
              <FieldError
                error={validationErrors?.leader?.yearOfStudy?._errors}
              />
            </div>
          </div>
        </section>

        {Array.from({ length: teamSize - 1 }, (_, i) => i).map((index) => (
          <section
            key={index}
            className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
              Member {index + 1} Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.members[index].fullName}
                  onChange={(e) =>
                    handleMemberChange(index, "fullName", e.target.value)
                  }
                  className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
                />
                <FieldError
                  error={
                    validationErrors?.members?.[index]?.fullName?._errors
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.members[index].email}
                  onChange={(e) =>
                    handleMemberChange(index, "email", e.target.value)
                  }
                  className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
                />
                <FieldError
                  error={
                    validationErrors?.members?.[index]?.email?._errors
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <span className="bg-[#1f1c19] px-3 py-2 rounded-l-md border-r border-gray-600 text-gray-400 text-sm">
                    +94
                  </span>
                  <input
                    type="text"
                    value={formData.members[index].phone}
                    onChange={(e) =>
                      handleMemberChange(index, "phone", e.target.value)
                    }
                    className="flex-1 bg-[#1f1c19] rounded-r-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
                  />
                </div>
                <FieldError
                  error={
                    validationErrors?.members?.[index]?.phone?._errors
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  University / Institution Name
                </label>
                <UniversityInput
                  value={formData.members[index].university}
                  onChange={(value) =>
                    handleMemberChange(index, "university", value)
                  }
                />
                <FieldError
                  error={
                    validationErrors?.members?.[index]?.university?._errors
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Student ID Number
                </label>
                <input
                  type="text"
                  value={formData.members[index].studentId}
                  onChange={(e) =>
                    handleMemberChange(index, "studentId", e.target.value)
                  }
                  className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
                />
                <FieldError
                  error={
                    validationErrors?.members?.[index]?.studentId?._errors
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Year of Study
                </label>
                <select
                  value={formData.members[index].yearOfStudy}
                  onChange={(e) =>
                    handleMemberChange(index, "yearOfStudy", e.target.value)
                  }
                  className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
                >
                  <option value="">Select</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                <FieldError
                  error={
                    validationErrors?.members?.[index]?.yearOfStudy?._errors
                  }
                />
              </div>
            </div>
          </section>
        ))}
      </section>

      {success && (
        <div className="w-full max-w-5xl bg-green-600 text-white rounded-xl p-4 mb-6 shadow-lg fixed bottom-0">
          <p className="font-semibold">
            Success! Your team registration has been submitted.
          </p>
        </div>
      )}
      {showScrollHint && !success && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden"
          onClick={() => {
            formRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <span className="w-9 h-9 rounded-full bg-[#e0a82e] text-black flex items-center justify-center text-lg font-black animate-bounce">
            ↓
          </span>
        </div>
      )}

      <Button
        text={loading ? "SUBMITTING..." : "REGISTER"}
        onClick={handleSubmit}
        disabled={loading || success}
      ></Button>
    </main>
  );
}