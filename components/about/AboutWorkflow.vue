<!-- "How I work" block on /about: header band + two bento rows (time split, feedback loop, worktrees, skills, rest days). -->
<script setup lang="ts">
import { aboutWorkflow } from "@/data/about";
import { homeFeedbackLoopCards, homeAgentToolingCards, homeAiTimeCards, homeRestCards } from "@/data/home";

const { feedbackLoop } = homeFeedbackLoopCards;
const { time } = homeAiTimeCards;
const { worktrees, skills } = homeAgentToolingCards;
const { restDays } = homeRestCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <AboutSection
    id="how-i-work"
    class="about-workflow"
    :eyebrow="aboutWorkflow.eyebrow"
    :title="aboutWorkflow.title"
    :highlight="aboutWorkflow.highlight"
  />
  <HomeBentoSection id="about-workflow-1">
    <div :class="[cell, `${cell}--span-7`]">
      <HomeBentoCard data-card-id="6" :eyebrow="time.eyebrow" :title="time.title">
        <HomeAiTimeSplit :slices="time.slices" :rows="time.rows" :caption="time.caption" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-5`]">
      <HomeBentoCard data-card-id="7" :eyebrow="feedbackLoop.eyebrow" :title="feedbackLoop.title">
        <HomeFeedbackLoop :steps="feedbackLoop.steps" :caption="feedbackLoop.caption" />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
  <HomeBentoSection id="about-workflow-2">
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="14" :eyebrow="worktrees.eyebrow" :title="worktrees.title">
        <HomeAiWorktreeTree :entries="worktrees.entries" :caption="worktrees.caption" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="15" :eyebrow="skills.eyebrow" :title="skills.title">
        <HomeAiSkills :query="skills.query" :commands="skills.commands" :caption="skills.caption" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`, `${cell}--full-md`]">
      <HomeBentoCard data-card-id="16" :eyebrow="restDays.eyebrow" :title="restDays.title">
        <HomeLifeRecharge :charge="restDays.charge" :caption="restDays.caption" />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

<style lang="scss">
// The bento rows below draw their own top border; drop the header's so the
// two don't double up.
.about-workflow .about-section__header {
  border-bottom: 0;
}
</style>
