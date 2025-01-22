<template>
    <div class="proposals">
        <h1>Proposals</h1>
        <ul>
            <li v-for="proposal in proposals" :key="proposal.id">
                <h2>{{ proposal.title }}</h2>
                <p>{{ proposal.description }}</p>
                <p><strong>Submitted by:</strong> {{ proposal.freelancerName }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            proposals: [
                {
                    id: 1,
                    title: 'Proposal 1',
                    description: 'Description for proposal 1',
                    freelancerName: 'Freelancer A'
                },
                {
                    id: 2,
                    title: 'Proposal 2',
                    description: 'Description for proposal 2',
                    freelancerName: 'Freelancer B'
                },
                // Add more proposals as needed
            ]
        };
    }
};
</script>

<style scoped>
.proposals {
    padding: 20px;
}

.proposals h1 {
    margin-bottom: 20px;
}

.proposals ul {
    list-style-type: none;
    padding: 0;
}

.proposals li {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.proposals h2 {
    margin: 0 0 10px 0;
}
</style>