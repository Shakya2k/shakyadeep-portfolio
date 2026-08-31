// Site-wide feature flags and configuration
// This file controls which features are enabled/disabled across the site

export const FEATURES = {
  // To enable the intro video:
  // 1. Add your video file as public/videos/intro.mp4
  // 2. Set introVideoEnabled to true
  // 3. Redeploy the site
  introVideoEnabled: false,
};

export const SITE_CONFIG = {
  title: "Shakya Bhattacharyya | Data Scientist, Decision Science & Production ML",
  description:
    "Data Scientist building production decision systems with Python, SQL, machine learning, forecasting, experimentation and operational analytics.",
  role: "Data Scientist",
  differentiation: "Decision Science & Production ML",
  capabilities:
    "Experimentation • Forecasting • Applied ML • Operational Decision Systems • Applied AI",
};
