"use client";
import React, { useState } from "react";

export default function Register() {
  const [teamSize, setTeamSize] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: "",
    leader: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      studentId: "",
      yearOfStudy: "",
    },
    members: Array(4).fill({
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

  const handleLeaderChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      leader: { ...formData.leader, [field]: value },
    });
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData({ ...formData, members: newMembers });
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
    setError("");
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Prepare data for Google Sheets
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
        throw new Error(result.error || "Failed to submit form");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        teamName: "",
        teamSize: "",
        leader: {
          fullName: "",
          email: "",
          phone: "",
          university: "",
          studentId: "",
          yearOfStudy: "",
        },
        members: Array(4).fill({
          fullName: "",
          email: "",
          phone: "",
          university: "",
          studentId: "",
          yearOfStudy: "",
        }),
      });
      setTeamSize(3);
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0d08] text-white flex flex-col items-center py-10 px-4">
      {error && (
        <div className="w-full max-w-5xl bg-red-600 text-white rounded-xl p-4 mb-6 shadow-lg">
          <p className="font-semibold">Error: {error}</p>
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
              Each team must consist of 3 to 5 members. Teams should include
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
              <option value="">Select</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl bg-[#2b2825] rounded-xl p-6 md:p-8 mb-10 shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
          Team Leader Details
        </h2>
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
            <input
              type="text"
              value={formData.leader.university}
              onChange={(e) => handleLeaderChange("university", e.target.value)}
              className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
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
              <input
                type="text"
                value={formData.members[index].university}
                onChange={(e) =>
                  handleMemberChange(index, "university", e.target.value)
                }
                className="w-full bg-[#1f1c19] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e0a82e]"
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
        } bg-[#e0a82e] text-black font-semibold rounded-md px-8 py-2 hover:bg-[#f2c14e] transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? "SUBMITTING..." : "REGISTER"}
      </button>
    </main>
  );
}
