"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PROBLEMS, CATEGORIES, Problem } from "../data/problems";
import ProgressRing from "../components/ProgressRing";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [starredList, setStarredList] = useState<string[]>([]);

  // Cookie helper functions
  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") return;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
  };

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    const savedCompleted = getCookie("leetcode-completed");
    const savedStarred = getCookie("leetcode-starred");
    const timer = setTimeout(() => {
      if (savedCompleted) {
        try {
          setCompletedList(JSON.parse(savedCompleted));
        } catch (e) {
          console.error(e);
        }
      }
      if (savedStarred) {
        try {
          setStarredList(JSON.parse(savedStarred));
        } catch (e) {
          console.error(e);
        }
      }
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to cookies when lists change
  useEffect(() => {
    if (mounted) {
      setCookie("leetcode-completed", JSON.stringify(completedList));
    }
  }, [completedList, mounted]);

  useEffect(() => {
    if (mounted) {
      setCookie("leetcode-starred", JSON.stringify(starredList));
    }
  }, [starredList, mounted]);

  const toggleCompleted = (id: string) => {
    setCompletedList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleStarred = (id: string) => {
    setStarredList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all your progress and stars?",
      )
    ) {
      setCompletedList([]);
      setStarredList([]);
    }
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((prob) => {
      // Search term filter
      const matchesSearch = prob.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Category filter
      const matchesCategory =
        activeCategory === "All" || prob.category === activeCategory;

      // Starred filter
      const matchesStarred = !showStarredOnly || starredList.includes(prob.id);

      // Completed filter
      const matchesCompleted =
        !hideCompleted || !completedList.includes(prob.id);

      return (
        matchesSearch && matchesCategory && matchesStarred && matchesCompleted
      );
    });
  }, [
    search,
    activeCategory,
    showStarredOnly,
    hideCompleted,
    completedList,
    starredList,
  ]);

  // Pick a random unsolved problem and open it
  const handleRandomPick = () => {
    const unsolved = filteredProblems.filter(
      (p) => !completedList.includes(p.id),
    );
    if (unsolved.length === 0) {
      alert("No unsolved problems found in the current selection!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * unsolved.length);
    const chosen = unsolved[randomIndex];
    window.open(`https://leetcode.com/problems/${chosen.slug}/`, "_blank");
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = PROBLEMS.length;
    const solved = completedList.length;

    const easy = PROBLEMS.filter((p) => p.difficulty === "Easy");
    const easyTotal = easy.length;
    const easySolved = easy.filter((p) => completedList.includes(p.id)).length;

    const medium = PROBLEMS.filter((p) => p.difficulty === "Medium");
    const mediumTotal = medium.length;
    const mediumSolved = medium.filter((p) =>
      completedList.includes(p.id),
    ).length;

    const hard = PROBLEMS.filter((p) => p.difficulty === "Hard");
    const hardTotal = hard.length;
    const hardSolved = hard.filter((p) => completedList.includes(p.id)).length;

    return {
      total,
      solved,
      easyTotal,
      easySolved,
      mediumTotal,
      mediumSolved,
      hardTotal,
      hardSolved,
    };
  }, [completedList]);

  // Group problems by category for display
  const groupedProblems = useMemo(() => {
    const groups: { [key: string]: Problem[] } = {};

    // Initialize groups in correct order
    CATEGORIES.forEach((cat) => {
      groups[cat] = [];
    });

    filteredProblems.forEach((prob) => {
      if (groups[prob.category]) {
        groups[prob.category].push(prob);
      } else {
        groups[prob.category] = [prob];
      }
    });

    return groups;
  }, [filteredProblems]);

  const getDifficultyColor = (diff: Problem["difficulty"]) => {
    switch (diff) {
      case "Easy":
        return "#2cbb5d";
      case "Medium":
        return "#ffb800";
      case "Hard":
        return "#ef4747";
    }
  };

  const handleHelp = () => {
    alert(
      "LeetCode Study Guide Info:\n\n• Checkbox: Toggles completed status.\n• Star: Flags as favorite.\n• Problem Title: Opens the problem on LeetCode in a new tab.\n• Solution Icon: Links directly to LeetCode's Solutions tab.\n• Shuffle Icon: Opens a random unsolved problem.",
    );
  };

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "var(--bg-main)",
          color: "var(--text-secondary)",
        }}
      >
        Loading Tracker...
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}
      className="animate-fade-in"
    >
      {/* Top Header & Stats Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Info Panel */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              display: "inline-flex",
              padding: "4px",
              borderRadius: "50%",
              border: "2px solid var(--text-muted)",
              width: "24px",
              height: "24px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: "bold",
              marginTop: "2px",
            }}
          >
            ?
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "16px",
                lineHeight: "1.5",
                maxWidth: "450px",
              }}
            >
              This list is curated to focus on essential coding patterns rather
              than question memorization, aiming to build a strong
              problem-solving foundation for technical interviews. We will be
              adding our solutions with detailed explanations soon.
            </p>

            {/*<button
              style={{
                color: "var(--text-secondary)",
                fontSize: "16px",
                lineHeight: "1.5",
                maxWidth: "450px",
              }}
            >
              Sync with GitHub
            </button>*/}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <button
                disabled
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-muted)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "not-allowed",
                  opacity: 0.7,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{
                    color: "var(--text-primary)",
                    flexShrink: 0,
                  }}
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.19 1.18a11.1 11.1 0 0 1 5.8 0c2.22-1.49 3.18-1.18 3.18-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.79 1.08.79 2.19v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>

                <span>Sync with GitHub</span>

                <span
                  style={{
                    marginLeft: "4px",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "rgba(255,184,0,0.12)",
                    color: "var(--color-medium)",
                  }}
                >
                  Coming Soon
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Stats breakdown */}
        <ProgressRing
          solvedCount={stats.solved}
          totalCount={stats.total}
          easySolved={stats.easySolved}
          easyTotal={stats.easyTotal}
          mediumSolved={stats.mediumSolved}
          mediumTotal={stats.mediumTotal}
          hardSolved={stats.hardSolved}
          hardTotal={stats.hardTotal}
        />
      </div>

      {/* Sleek Leetcode-style Toolbar */}
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "8px",
          padding: "12px 16px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          border: "1px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
        {/* Left Toolbar section: Search & Action buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            minWidth: "280px",
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                display: "flex",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "var(--bg-main)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "8px 12px 8px 36px",
                color: "var(--text-primary)",
                fontSize: "13px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--border-focus)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Filter/Hide Completed button */}
          <button
            onClick={() => setHideCompleted(!hideCompleted)}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              backgroundColor: hideCompleted
                ? "var(--bg-hover)"
                : "transparent",
              color: hideCompleted ? "var(--accent-teal)" : "var(--text-muted)",
              transition: "all 0.2s",
              display: "flex",
            }}
            title="Filter Completed"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>

          {/* Starred filter button */}
          <button
            onClick={() => setShowStarredOnly(!showStarredOnly)}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              backgroundColor: showStarredOnly
                ? "var(--bg-hover)"
                : "transparent",
              color: showStarredOnly
                ? "var(--color-medium)"
                : "var(--text-muted)",
              transition: "all 0.2s",
              display: "flex",
            }}
            title="Show Starred Only"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={showStarredOnly ? "var(--color-medium)" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>

          {/* Random pick button */}
          <button
            onClick={handleRandomPick}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              color: "var(--text-muted)",
              transition: "color 0.2s",
              display: "flex",
            }}
            title="Pick a random unsolved problem"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
        </div>

        {/* Right Toolbar section: Reset & Help */}
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Reset trash */}
          <button
            onClick={handleReset}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              color: "var(--text-muted)",
              transition: "color 0.2s",
              display: "flex",
            }}
            title="Reset All Progress"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-hard)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>

          {/* Help button */}
          <button
            onClick={handleHelp}
            style={{
              padding: "8px 10px",
              borderRadius: "4px",
              color: "var(--text-muted)",
              transition: "color 0.2s",
              display: "flex",
            }}
            title="Help Info"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <span
              style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "1" }}
            >
              ?
            </span>
          </button>
        </div>
      </div>

      {/* Category Horizontal Filter Tags */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "12px",
          marginBottom: "24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* All Topic Tag */}
        <button
          onClick={() => setActiveCategory("All")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            fontWeight: activeCategory === "All" ? "bold" : "normal",
            color: activeCategory === "All" ? "#00b0ff" : "var(--text-primary)",
            padding: "4px 8px",
            whiteSpace: "nowrap",
          }}
        >
          All Topics
          <span
            style={{
              fontSize: "11px",
              backgroundColor:
                activeCategory === "All"
                  ? "rgba(0,176,255,0.15)"
                  : "var(--bg-card)",
              color: activeCategory === "All" ? "#00b0ff" : "var(--text-muted)",
              padding: "1px 6px",
              borderRadius: "10px",
              fontWeight: "normal",
            }}
          >
            {PROBLEMS.length}
          </span>
        </button>

        {/* Individual Category Tags */}
        {CATEGORIES.map((cat) => {
          const count = PROBLEMS.filter((p) => p.category === cat).length;
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: isSelected ? "bold" : "normal",
                color: isSelected ? "#00b0ff" : "var(--text-primary)",
                padding: "4px 8px",
                whiteSpace: "nowrap",
              }}
            >
              {cat}{" "}
              <span
                style={{
                  fontSize: "11px",
                  backgroundColor: isSelected
                    ? "rgba(0,176,255,0.15)"
                    : "var(--bg-card)",
                  color: isSelected ? "#00b0ff" : "var(--text-muted)",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  fontWeight: "normal",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Problems Table/Group Area */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {Object.entries(groupedProblems).map(([categoryName, problemList]) => {
          if (problemList.length === 0) return null;

          return (
            <div
              key={categoryName}
              className="animate-fade-in"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Table Group Header */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  marginBottom: "4px",
                  letterSpacing: "0.2px",
                }}
              >
                {categoryName}
              </div>

              {/* Table Container */}
              <div
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "8px",
                  overflowX: "auto",
                  border: "1px solid var(--border)",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    minWidth: "600px",
                    borderCollapse: "collapse",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--border)",
                        backgroundColor: "rgba(0,0,0,0.1)",
                      }}
                    >
                      <th
                        style={{
                          padding: "12px 16px",
                          width: "70px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Status
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          width: "60px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Star
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Problem
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          width: "120px",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Difficulty
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          width: "auto",
                          textAlign: "center",
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        Our Solution
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {problemList.map((prob, idx) => {
                      const isCompleted = completedList.includes(prob.id);
                      const isStarred = starredList.includes(prob.id);

                      return (
                        <tr
                          key={prob.id}
                          style={{
                            borderBottom:
                              idx < problemList.length - 1
                                ? "1px solid var(--border)"
                                : "none",
                            backgroundColor: isCompleted
                              ? "var(--bg-checked)"
                              : "transparent",
                            transition: "background-color 0.15s",
                          }}
                        >
                          {/* Checkbox Status */}
                          <td
                            style={{
                              padding: "10px 16px",
                              textAlign: "center",
                            }}
                          >
                            <button
                              onClick={() => toggleCompleted(prob.id)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "18px",
                                height: "18px",
                                borderRadius: "4px",
                                border: `2px solid ${isCompleted ? "var(--accent-teal)" : "#5f6167"}`,
                                backgroundColor: isCompleted
                                  ? "var(--accent-teal)"
                                  : "transparent",
                                transition: "all 0.12s",
                              }}
                            >
                              {isCompleted && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </button>
                          </td>

                          {/* Star Toggle */}
                          <td
                            style={{
                              padding: "10px 16px",
                              textAlign: "center",
                            }}
                          >
                            <button
                              onClick={() => toggleStarred(prob.id)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: isStarred
                                  ? "var(--color-medium)"
                                  : "#5f6167",
                              }}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={
                                  isStarred ? "var(--color-medium)" : "none"
                                }
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            </button>
                          </td>

                          {/* Problem name external link */}
                          <td style={{ padding: "10px 16px" }}>
                            <a
                              href={`https://leetcode.com/problems/${prob.slug}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#ffffff",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              {prob.name}
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--text-muted)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            </a>
                          </td>

                          {/* Difficulty tag */}
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: "14px",
                              fontWeight: "bold",
                              color: getDifficultyColor(prob.difficulty),
                            }}
                          >
                            {prob.difficulty}
                          </td>

                          {/* Solution external link */}
                          <td
                            style={{
                              padding: "10px 16px",
                              textAlign: "center",
                            }}
                          >
                            {/*<a
                              href={`https://leetcode.com/problems/${prob.slug}/solutions/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--text-muted)",
                                transition: "color 0.12s",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.color =
                                  "var(--text-primary)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.color =
                                  "var(--text-muted)")
                              }
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                            </a>*/}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty Selection state */}
      {filteredProblems.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "48px 24px",
            color: "var(--text-secondary)",
            backgroundColor: "var(--bg-card)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            marginTop: "12px",
          }}
          className="glow-card"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: "12px" }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            No problems matches your filter
          </h4>
          <p style={{ fontSize: "13px" }}>
            Try clearing search terms or resetting filters.
          </p>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "12px",
        }}
      >
        These problems were curated from{" "}
        <a
          href="https://github.com/a2ys/dsa"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--color-easy)",
            fontWeight: 500,
            textDecoration: "underline",
          }}
        >
          github.com/a2ys/dsa
        </a>
      </footer>
    </div>
  );
}
