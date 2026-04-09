import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.appBg,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.appBg,
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },

  cardLight: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  cardDark: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  langRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  langChip: {
    backgroundColor: "#111C34",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  langChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  langChipText: {
    color: "#C8D3F0",
    fontSize: 12,
    fontWeight: "800",
  },
  langChipTextActive: {
    color: "#0A1225",
  },

  navRow: {
    paddingBottom: 14,
  },
  navChip: {
    backgroundColor: "#111C34",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  navChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  navChipText: {
    color: "#D6DDF2",
    fontSize: 13,
    fontWeight: "800",
  },
  navChipTextActive: {
    color: "#0A1225",
  },

  headerBlock: {
    marginTop: 4,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#142451",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.32)",
  },
  logoImage: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.32)",
    backgroundColor: "#142451",
  },
  logoText: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: "900",
  },
  brandText: {
    color: "#DCE5FF",
    fontSize: 15,
    fontWeight: "800",
  },
  updatedText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  badgePill: {
    backgroundColor: "#182754",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgePillText: {
    color: "#E7ECFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  mainTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 36,
  },
  mainSubtitle: {
    color: "#C4D0ED",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  sectionEyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  sectionTitleLight: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
  },
  sectionTextLight: {
    color: "#C4D0ED",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.textDark,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  sectionText: {
    color: colors.textMutedDark,
    fontSize: 15,
    lineHeight: 22,
  },

  summaryHeroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  summaryHeroBox: {
    width: "48.5%",
    backgroundColor: "#152551",
    borderRadius: 20,
    padding: 16,
  },
  summaryHeroBoxAlt: {
    width: "48.5%",
    backgroundColor: colors.surfaceLight,
    borderRadius: 20,
    padding: 16,
  },
  summaryHeroLabel: {
    color: "#B7C5EA",
    fontSize: 12,
    fontWeight: "700",
  },
  summaryHeroValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 8,
  },
  summaryHeroSub: {
    color: "#90A2D1",
    marginTop: 6,
    fontSize: 12,
  },
  summaryHeroLabelDark: {
    color: colors.textMutedDark,
    fontSize: 12,
    fontWeight: "700",
  },
  summaryHeroValueDark: {
    color: colors.textDark,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 8,
  },
  summaryHeroSubDark: {
    color: colors.textMutedDark,
    marginTop: 6,
    fontSize: 12,
  },

  roadmapRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E7EDF8",
  },
  roadmapRank: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  roadmapRankText: {
    color: "#071021",
    fontWeight: "900",
  },
  roadmapBody: {
    flex: 1,
  },
  roadmapTitle: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: "800",
  },
  roadmapMeta: {
    color: colors.textMutedDark,
    fontSize: 13,
    marginTop: 4,
  },
  roadmapTag: {
    backgroundColor: "#F2F5FC",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E2EAF8",
  },
  roadmapTagText: {
    color: colors.textDark,
    fontSize: 12,
    fontWeight: "800",
  },

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  featureCard: {
    width: "48.2%",
    backgroundColor: "#F8FAFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7EDF8",
  },
  featureCardTitle: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6,
  },
  featureCardText: {
    color: colors.textMutedDark,
    fontSize: 13,
    lineHeight: 19,
  },

  fieldWrap: {
    marginBottom: 10,
  },
  fieldLabel: {
    color: colors.textDark,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.chipLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textDark,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  optionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  optionChip: {
    backgroundColor: colors.chipLight,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipActive: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.surfaceDark,
  },
  optionChipText: {
    color: "#243451",
    fontSize: 13,
    fontWeight: "700",
  },
  optionChipTextActive: {
    color: colors.text,
  },

  primaryButton: {
    backgroundColor: colors.gold,
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#081328",
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.36)",
    paddingVertical: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
  },

  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 10,
    fontWeight: "700",
  },

  resultPrimaryValue: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 10,
  },

  insightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  insightTile: {
    width: "48.5%",
    backgroundColor: colors.surfaceLight,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  insightTileLabel: {
    color: colors.textMutedDark,
    fontSize: 12,
    fontWeight: "700",
  },
  insightTileValue: {
    color: colors.textDark,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 6,
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryMiniCard: {
    width: "48.5%",
    backgroundColor: "#F8FAFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E7EDF8",
    marginBottom: 10,
  },
  summaryMiniLabel: {
    color: colors.textMutedDark,
    fontSize: 12,
    fontWeight: "700",
  },
  summaryMiniValue: {
    color: colors.textDark,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 6,
  },
  summaryMiniValueSmall: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
  },

  detailLine: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E7EDF8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLineLabel: {
    color: colors.textMutedDark,
    fontSize: 13,
    fontWeight: "700",
  },
  detailLineValue: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: "900",
  },

  providerWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  providerPill: {
    backgroundColor: "#EEF3FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  providerPillText: {
    color: colors.textDark,
    fontWeight: "800",
    fontSize: 12,
  },

  bulletWrap: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletRowRtl: {
    flexDirection: "row-reverse",
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gold,
    marginTop: 8,
    marginRight: 10,
  },
  bulletDotRtl: {
    marginRight: 0,
    marginLeft: 10,
  },
  bulletText: {
    flex: 1,
    color: colors.textMutedDark,
    fontSize: 15,
    lineHeight: 22,
  },

  priceBadge: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: "#152551",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  priceBadgeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
  },

  footerNote: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 24,
  },
});

export default styles;
