<template>
  <PageTitle>Dashboard</PageTitle>
  <DashboardSumarry></DashboardSumarry>

  <div class="mt-16 md:flex">
    <div class="md:mx-6 md:basis-1/3">
      <h1 class="text-left font-bold">Latest Schedule</h1>
      <Table>
        <TableHead>
          <TableData class="font-bold">Date</TableData>
          <TableData class="font-bold">Time</TableData>
          <TableData class="font-bold"> Description</TableData>
        </TableHead>
        <tr class="border">
          <TableData>11/2/2023</TableData>
          <TableData>2:00</TableData>
          <TableData>submit android</TableData>
        </tr>
        <tr class="border">
          <TableData>11/2/2023</TableData>
          <TableData>2:00</TableData>
          <TableData>submit android</TableData>
        </tr>
        <TableEnd>
          <NuxtLink to="todo" class="font-light text-primary">
            see more
          </NuxtLink>
        </TableEnd>
      </Table>
    </div>

    <div class="mt-9 md:mt-0 md:basis-3/5">
      <h1 class="text-left font-bold">Priority</h1>
      <Table>
        <TableHead>
          <TableData class="font-bold">Priority</TableData>
          <TableData class="font-bold"> Description</TableData>
          <TableData class="font-bold">Due Date</TableData>
          <TableData class="font-bold">Status</TableData>
        </TableHead>
        <tr class="border">
          <TableData>
            <Priority class="bg-red-400"></Priority>
          </TableData>
          <TableData>submit android</TableData>
          <TableData>1/2/2019</TableData>
          <TableData>Done</TableData>
        </tr>
        <TableEnd>
          <NuxtLink class="font-light text-primary" to="priorities">
            see more
          </NuxtLink>
        </TableEnd>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
