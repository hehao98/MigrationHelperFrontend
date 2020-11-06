<template>
  <b-card class="about">
    <h3>Contact</h3>
    <ol>
      <li>
        Hao He, Peking University, heh AT pku.edu.cn,
        <b-link href="https://hehao98.github.io/" target="_blank">Personal Homepage</b-link>.
      </li>
    </ol>
    <hr class="my-4" />
    <h3>GitHub Repositories</h3>
    <ol>
      <li>
        <b-link href="https://github.com/hehao98/MigrationHelper" target="_blank"
          >MigrationHelper</b-link
        >. RESTful backend, command-line tools and paper replication materials.
      </li>
      <li>
        <b-link href="https://github.com/hehao98/MigrationHelperFrontend" target="_blank"
          >MigrationHelperFrontend</b-link
        >. The repository for this website.
      </li>
    </ol>
    <hr class="my-4" />
    <h3>Publications</h3>
    <ol>
      <li>
        Hao He, Yulin Xu, Yixiao Ma, Yifei Xu, Guangtai Liang, and Minghui Zhou. A Multi-Metric
        Ranking Approach for Library Migration Recommendations. Under Review.
        <b-link href="https://hehao98.github.io/files/2021-migration.pdf" target="_blank"
          >PDF
        </b-link>
      </li>
      <li>
        Hao He, Yulin Xu, Xiao Cheng, Guangtai Liang, and Minghui Zhou. MigrationAdvisor:
        Recommending Library Migration from GitHub Repositories. Submitted to ICSE 2021
        Demonstration Track.
        <b-link href="https://hehao98.github.io/files/2021-migration-advisor.pdf" target="_blank"
          >PDF
        </b-link>
      </li>
    </ol>
    <hr class="my-4" />
    <h3>Dataset Download</h3>
    <ol>
      <li>
        We provide a dataset of confirmed Java library migrations happened on GitHub.
        <b-link
          href="https://github.com/hehao98/MigrationHelper/blob/master/evaluation/manual/confirmed-migrations-all.xlsx"
          target="_blank"
          >Download Here</b-link
        >.
      </li>
      <li>
        Many other data is also available in the
        <b-link href="https://github.com/hehao98/MigrationHelper" target="_blank"
          >MigrationHelper</b-link
        >
        repository.
      </li>
      <li>
        A partial MongoDB database dump is available on
        <b-link
          href="https://drive.google.com/drive/folders/1UBTp9betjAi6gSly4OmGvLwIl7AJvUfg"
          target="_blank"
        >
          Google Drive</b-link
        >. Documentation
        <b-link
          href="https://github.com/hehao98/MigrationHelper/blob/master/doc/Database.md"
          target="_blank"
          >here</b-link
        >.
      </li>
      <li>
        Once the papers are accepted, we will permanently archive the full database dump somewhere
        (e.g. at Zenodo)
      </li>
    </ol>
  </b-card>
</template>

<style scoped>
.about {
  font-family: Consolas, monospace;
}
</style>
