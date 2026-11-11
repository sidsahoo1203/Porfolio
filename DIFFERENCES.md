# Resume vs LinkedIn — what doesn't match

Compared: FlowCV resume (26 Aug 2026) and LinkedIn profile export. The "Site shows" column is what `src/data/resume.ts` currently uses — change it there if you decide otherwise.

## Fix these first (real conflicts)

| # | Item | Resume says | LinkedIn says | Site shows |
|---|------|-------------|---------------|------------|
| 1 | LinkedIn URL | `linkedin.com/in/siddharth-sahoo-527b601ba` | `linkedin.com/in/siddharth-s-527b601ba` | Resume version. **Check which one opens your profile** and use it everywhere. |
| 2 | Webmyne job title | Trainee Web Developer | MERN Stack Developer Intern | Resume title |
| 3 | Webmyne dates | 12/2024 – 03/2025 (4 months) | Dec 2024 – May 2025 (6 months) | Resume dates |
| 4 | byteXL dates | 05/2024 – 07/2024 | May 2024 – June 2024 (2 months) | Resume dates |
| 5 | byteXL company name | byteXL TechEd Pvt Ltd. | byteXL | Resume name |
| 6 | Healthcare hackathon name | **Hack2Health** Hackathon | **Hack4Health** Hackathon 2026 | Hack2Health |
| 7 | Healthcare hackathon result | Secured 5th position | Top 5 Finalist | "5th position · Top 5 finalist" |
| 8 | LinguaVerse hackathon result | "Participated" | Finalist | Finalist |
| 9 | SRM Techno Hackathon | Won first place | Winning Team | "1st place · Winning team" |
| 10 | LinguaVerse project (LinkedIn card) | Built at the LinguaVerse Multilingual GenAI Hackathon | "Top 5 finalist at Hack4Health" | Resume version. Your resume says the Hack2Health entry was a medical-imaging/NLP backend, not LinguaVerse, so the LinkedIn card's claim looks wrong. |
| 11 | EduSkills location | Chennai | 10-week **virtual** internship (location: Chennai) | Both: lists Chennai, mentions it was virtual |
| 12 | M.Tech end date | Present | July 2027 | 07/2027 (expected) |
| 13 | B.Tech | CSE, 06/2021 – 06/2025 | "Computer Science", June 2021 – May 2025 | Resume |
| 14 | Institute name | **SRM Institute of Technology** ← typo | SRM IST | SRM Institute of Science and Technology. **Fix the resume.** |

## On LinkedIn but missing from your resume

- **Headline:** "Developer | Making Things Work"
- **Internships:** Slash Mark IT Solutions — Full Stack Web Development Intern (01/2024 – 03/2024, Telangana); Ministry of Cooperation × AICTE — National Cooperatives Data Repository Internship (12/2022 – 02/2023, Vadodara)
- **Publication:** "A Comprehensive Study on the Initiatives and Impact of the Clean India Mission"
- **Certifications:** Google Cybersecurity Certificate, Fortinet FortiGate 7.6 Operator, Scientific Observations from Space, Endpoint Security
  - Check whether "Google Cybersecurity Certificate" (LinkedIn) and "Foundation of Cyber Security" (resume) are the same certificate. If they are, delete one from `certifications`.
- **Languages:** Odia (native), Gujarati (native), Hindi (full professional), English (professional working)
- **Richer bullets:** Webmyne — Clean India Mission platform, JWT-protected admin, donation logs; EduSkills — WorkMail, SQL Server → Aurora migration, security/DR/cost labs; byteXL — Java and SQL
- **Projects:** Valence Chemical Group, CompanyOS, BharatAssist AI, Student Management System, Tomato (DisasterEye only appears under Achievements on the resume)

## On your resume but missing from LinkedIn

- Certifications: Web Development Bootcamp (CodeHelp), Cyber Security Essentials (Cisco), Foundation of Cyber Security (Google/Coursera), Geodata Processing using Python & ML (IIRS, ISRO)
- CGPA / percentages, HSC and SSC schooling
- Hack2Health "5th position" wording, AI/ML Hackathon "Dermtech" details
- Full skills list (LinkedIn top skills are only Render, PostgreSQL, Spring Boot)
- Website link siddharthsahoo.in

## Out of date

- LinkedIn summary says you're "seeking a full-time role beginning in 2026". It's already late 2026, and the M.Tech runs to July 2027, so update this to a 2027 start (or whatever you're actually targeting).

## Project links

| Project | GitHub repo | Live site |
|---|---|---|
| DisasterEye | github.com/sidsahoo1203/DisasterEye | — |
| LinguaVerse AI | github.com/sidsahoo1203/LinguaVerse-AI | lingua-verse-ai-seven.vercel.app |
| Valence Chemical Group | github.com/sidsahoo1203/Valence-Chemical-Group | — |
| CompanyOS | github.com/sidsahoo1203/CompanyOS | companyos-bxk6.onrender.com *(from the repo's handbook)* |
| BharatAssist AI | github.com/sidsahoo1203/BharatAssist | — |
| Libraro | github.com/sidsahoo1203/Library-Management-System | library-management-system-two-delta.vercel.app |
| Tomato | github.com/sidsahoo1203/Tomato-React-Application | — |
| Kaam247 | *no public repo found* | kaam247.in/dashboard |
| MediTrack | *no public repo found* | meditrack-site.netlify.app |
| Student Management System | *no public repo found* | — |

Missing links? Add them to `links` on that project in `src/data/resume.ts`, e.g. `{ kind: 'live', url: 'https://…' }`.

Small cleanup: the LinguaVerse-AI repo contains a Java crash log (`hs_err_pid23904.log`) at its root. Delete it before recruiters look.
