"use client";
// CHANGED: Imported useEffect
import React, { useState, useEffect } from "react";

// ADDED: University list as per your request
const universityList = [
  "University of Colombo School of Computing (UCSC)",
  "University of Colombo",
  "University of Peradeniya",
  "University of Sri Jayewardenepura",
  "University of Kelaniya",
  "University of Moratuwa",
  "University of Jaffna",
  "University of Ruhuna",
  "OUSL (Open University of Sri Lanka)",
  "Eastern University",
  "South Eastern University",
  "Rajarata University",
  "Sabaragamuva University",
  "Wayamba University",
  "Uva Wellassa University",
  "University of the Visual & Performing Arts",
  "Gampaha Wickramarachchi University of Indigenous Medicine",
  "University of Vavuniya",
  "KDU (General Sir John Kotelawala Defence University)",
  "Buddhasravaka Bhiksu University",
  "Buddhist and Pali University",
  "Ocean University",
  "UNIVOTEC (University of Vocational Technology)",
  "SLIIT (Sri Lanka Institute of Information Technology)",
  "CINEC Campus",
  "NSBM Green University",
  "Aquinas College",
  "Horizon Campus",
  "Saegis Campus",
  "KAATSU",
  "SANASA Campus",
  "SLT Campus (Mobitel Campus)",
  "Nāgānanda International Institute for Buddhist Studies",
  "SIBA Campus (Sri Lanka International Buddhist Academy)",
  "NIBM (National Institute of Business Management)",
  "SAITM",
  "Other", // ADDED: "Other" option
];

// ADDED: Reusable component for University Dropdown + "Other" input
const UniversityInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  // Check if the current value is one from the list or a custom one
  const isOther = value && !universityList.includes(value);
  const [showOtherInput, setShowOtherInput] = useState(isOther);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Other") {
      setShowOtherInput(true);
      onChange(""); // Clear value so user can type
    } else {
      setShowOtherInput(false);
      onChange(selectedValue);
    }
  };

  return (
    <div>
      <select
        value={showOtherInput ? "Other" : value}
        onChange={handleSelectChange}
        className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
      >
        <option value="">Select</option>
        {universityList.map((uni) => (
          <option key={uni} value={uni}>
            {uni}
          </option>
        ))}
      </select>
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

export default function Register() {
  // CHANGED: Default team size to 3 (new minimum)
  const [teamSize, setTeamSize] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // ADDED: State for "same university" checkbox
  const [allSameUniversity, setAllSameUniversity] = useState(false);

  // ADDED: Timeout for error message
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      // Set timer to clear error after 5 seconds
      timer = setTimeout(() => {
        setError("");
      }, 5000);
    }
    // Cleanup function: If error changes (e.g., manual close) or component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]); // This effect runs whenever the 'error' state changes

  const [formData, setFormData] = useState({
    teamName: "",
    // CHANGED: Default team size to "3"
    teamSize: "3",
    leader: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      studentId: "",
      yearOfStudy: "",
    },
    // CHANGED: Max 3 members (for a total of 4)
    members: Array(3).fill({
      fullName: "",
      email: "",
      phone: "",
      university: "",
      studentId: "",
      yearOfStudy: "",
    }),
  });

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setTeamSize(size);
    setFormData({ ...formData, teamSize: e.target.value });
  };

  // CHANGED: Updated handleLeaderChange to manage auto-filling member universities
  const handleLeaderChange = (field: string, value: string) => {
    const newLeader = { ...formData.leader, [field]: value };
    let newMembers = [...formData.members];

    // If the field being changed is "university" AND the box is checked
    if (field === "university" && allSameUniversity) {
      newMembers = newMembers.map((member) => ({
        ...member,
        university: value, // Set member uni to new leader uni
      }));
    }

    setFormData({
      ...formData,
      leader: newLeader,
      members: newMembers,
    });
  };

  // CHANGED: Updated handleMemberChange to uncheck box if university differs
  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };

    // If user changes university, and it's different from leader's, uncheck the box.
    if (field === "university" && allSameUniversity) {
      if (value !== formData.leader.university) {
        setAllSameUniversity(false);
      }
    }

    setFormData({ ...formData, members: newMembers });
  };

  // ADDED: Handler for the "same university" checkbox
  const handleSameUniversityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setAllSameUniversity(isChecked);

    if (isChecked) {
      const leaderUniversity = formData.leader.university;
      // Only autofill if leader uni is already set
      if (leaderUniversity) {
        const newMembers = formData.members.map((member) => ({
          ...member,
          university: leaderUniversity,
        }));
        setFormData({ ...formData, members: newMembers });
      }
    }
    // If unchecked, we don't clear member universities. User can change manually.
  };

  const validateForm = () => {
    if (!formData.teamName.trim()) return "Team name is required";
    if (!formData.teamSize) return "Team size is required";

    // Validate leader
    if (!formData.leader.fullName.trim()) return "Leader name is required";
    if (!formData.leader.email.trim()) return "Leader email is required";
    if (!formData.leader.phone.trim()) return "Leader phone is required";
    if (!formData.leader.university.trim())
      return "Leader university is required";
    if (!formData.leader.studentId.trim())
      return "Leader student ID is required";
    if (!formData.leader.yearOfStudy) return "Leader year of study is required";

    // Validate members (teamSize - 1 because leader counts as 1)
    const membersToValidate = teamSize - 1;
    for (let i = 0; i < membersToValidate; i++) {
      const member = formData.members[i];
      if (!member.fullName.trim()) return `Member ${i + 1} name is required`;
      if (!member.email.trim()) return `Member ${i + 1} email is required`;
      if (!member.phone.trim()) return `Member ${i + 1} phone is required`;
      if (!member.university.trim())
        return `Member ${i + 1} university is required`;
      if (!member.studentId.trim())
        return `Member ${i + 1} student ID is required`;
      if (!member.yearOfStudy)
        return `Member ${i + 1} year of study is required`;
    }

    return null;
  };

  const handleSubmit = async () => {
    console.log("ckci");
    setError("");
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      console.log(validationError);
      setError(validationError);
      return;
    }

    setLoading(true);
    console.log("go");

    try {
      // Prepare data for Google Sheets
      const teamMembers = [
        formData.leader,
        ...formData.members.slice(0, teamSize - 1),
      ];

      console.log(teamMembers);

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

      console.log(sheetData);
      const response = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        teamName: "",
        teamSize: "3", // CHANGED: Reset to new default
        leader: {
          fullName: "",
          email: "",
          phone: "",
          university: "",
          studentId: "",
          yearOfStudy: "",
        },
        members: Array(3).fill({
          // CHANGED: Reset to new array size
          fullName: "",
          email: "",
          phone: "",
          university: "",
          studentId: "",
          yearOfStudy: "",
        }),
      });
      setTeamSize(3); // CHANGED: Reset to new default
      setAllSameUniversity(false); // ADDED: Reset checkbox state
    } catch (err: any) {
      console.log(err);
      setError(err.message || "An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0d08] text-white flex flex-col items-center py-10 px-4">
      {/* CHANGED: Error message now fixed, has a timeout, and a close button */}
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-red-600 text-white rounded-xl p-4 shadow-lg z-50 flex items-center justify-between">
          <p className="font-semibold">Error: {error}</p>
          <button
            onClick={() => setError("")}
            className="ml-4 text-white font-bold text-2xl leading-none hover:opacity-75"
          >
            &times;
          </button>
        </div>
      )}

      <section className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
          Competition Guidelines
        </h2>

        <div className="space-y-5 text-sm md:text-base text-gray-200 leading-relaxed">
          <div>
            <h3 className="text-[#e0a82e] font-semibold mb-1">
              1. Team Composition Requirements
            </h3>
            <p>
              {/* CHANGED: Team size rule updated */}
              Each team must consist of 3 to 4 members. Teams should include
              individuals with complementary skills in:
            </p>
            <ul className="list-disc list-inside ml-3 mt-1">
              <li>
                Software Development / Engineering (Frontend, Backend, or
                Full-stack)
              </li>
              <li>
                Cybersecurity / Information Security (offensive or defensive)
              </li>
              <li>
                Optional: UI/UX Designer, DevOps Engineer, or Project Lead for
                better coordination.
              </li>
            </ul>
            <p className="mt-1">
              Teams are encouraged to ensure a balance between innovation and
              security expertise.
            </p>
          </div>

          <div>
            <h3 className="text-[#e0a82e] font-semibold mb-1">
              2. Role Expectations
            </h3>
            <p>
              Developers are responsible for system design, coding, and feature
              implementation. Security Specialists ensure solutions are built
              with secure architectures, perform threat modeling, vulnerability
              assessment, and ensure compliance with best security practices.
              Collaboration between both roles is mandatory to deliver
              secure-by-design solutions.
            </p>
          </div>

          <div>
            <h3 className="text-[#e0a82e] font-semibold mb-1">
              3. Eligibility
            </h3>
            <p>
              Participants may be students, professionals, or independent
              innovators. All members must register under one team name. A
              participant may not belong to multiple teams.
            </p>
          </div>
        </div>
      </section>

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
              {/* CHANGED: Options updated to 3 and 4 only */}
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg">
        {/* ADDED: Checkbox for "Same University" */}
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
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              value={formData.leader.email}
              onChange={(e) => handleLeaderChange("email", e.target.value)}
              className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
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
                value={formData.leader.phone}
                onChange={(e) => handleLeaderChange("phone", e.target.value)}
                className="flex-1 bg-[#1f1c19] rounded-r-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              University / Institution Name
            </label>
            {/* CHANGED: Replaced text input with UniversityInput component */}
            <UniversityInput
              value={formData.leader.university}
              onChange={(value) => handleLeaderChange("university", value)}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Student ID Number
            </label>
            <input
              type="text"
              value={formData.leader.studentId}
              onChange={(e) => handleLeaderChange("studentId", e.target.value)}
              className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
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
          </div>
        </div>
      </section>

      {/* CHANGED: Loop length is correct, maps to teamSize of 3 or 4 */}
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
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.members[index].email}
                onChange={(e) =>
                  handleMemberChange(index, "email", e.target.value)
                }
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
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
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                University / Institution Name
              </label>
              {/* CHANGED: Replaced text input with UniversityInput component */}
              <UniversityInput
                value={formData.members[index].university}
                onChange={(value) =>
                  handleMemberChange(index, "university", value)
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
            </div>
          </div>
        </section>
      ))}
      {success && (
        <div className="w-full max-w-5xl bg-green-600 text-white rounded-xl p-4 mb-6 shadow-lg fixed bottom-0">
          <p className="font-semibold">
            Success! Your team registration has been submitted.
          </p>
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading || success}
        className={` ${
          success ? "hidden" : "block"
        } bg-[#e0a82e] text-black font-semibold rounded-md px-8 py-2 hover:bg-[#f2c14e] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
      >
        {loading ? "SUBMITTING..." : "REGISTER"}
      </button>
    </main>
  );
}