from typing import List
from fastapi import APIRouter, Depends
from models.insights import (
    CareerInsightResponse, SkillRecommendation, TrajectoryStage
)
from middleware.auth import get_current_user

router = APIRouter(prefix="/insights", tags=["Career Intelligence & Trajectory"])

@router.get("/career", response_model=CareerInsightResponse)
async def get_career_insights(current_user: dict = Depends(get_current_user)):
    return CareerInsightResponse(
        targetRole="Senior Full-Stack Engineer",
        marketReadinessScore=86,
        salaryBenchmark="$145,000 - $175,000 USD",
        hiringDemandIndex="Very High (9.2/10)",
        topStrengths=[
            "Strong TypeScript + React architecture and component systems experience.",
            "Demonstrated async Python / FastAPI backend design.",
            "Clear technical writing and STAR-aligned accomplishment metrics."
        ],
        criticalGapAreas=[
            "Cloud Infrastructure: Deep dive into Kubernetes and Terraform orchestration.",
            "Distributed Streaming: Hands-on implementation of Apache Kafka or RabbitMQ event pipelines."
        ],
        strategicRecommendations=[
            "Publish an open-source demonstration of an event-driven FastAPI microservice cluster.",
            "Attain AWS Certified Solutions Architect Associate or equivalent credential.",
            "Target Tier-1 SaaS engineering roles with an emphasis on system design depth."
        ],
        recommendedSkills=[
            SkillRecommendation(
                name="Kubernetes & Helm",
                demandGrowth="+38% YoY",
                urgency="High",
                description="Container orchestration standard for modern distributed web platforms.",
                suggestedCourseOrProject="Deploy a multi-service FastAPI + React app on a local Minikube cluster with ingress controllers."
            ),
            SkillRecommendation(
                name="Apache Kafka",
                demandGrowth="+44% YoY",
                urgency="High",
                description="High-throughput distributed event log for real-time data pipelines.",
                suggestedCourseOrProject="Build an asynchronous order notification service with dead letter topics."
            ),
            SkillRecommendation(
                name="Terraform / IaC",
                demandGrowth="+29% YoY",
                urgency="Medium",
                description="Declarative cloud infrastructure provisioning across AWS and GCP.",
                suggestedCourseOrProject="Write automated Terraform modules for VPC, ECS Fargate, and RDS Postgres."
            ),
            SkillRecommendation(
                name="LLM Orchestration (LangChain/LlamaIndex)",
                demandGrowth="+120% YoY",
                urgency="Emerging",
                description="Integrating generative AI capabilities into enterprise web products.",
                suggestedCourseOrProject="Implement RAG workflows with vector databases and semantic caching."
            )
        ],
        trajectoryPath=[
            TrajectoryStage(
                stage="Current",
                roleTitle="Full-Stack Engineer (Mid-Level)",
                estimatedTimeframe="Present",
                salaryRange="$110,000 - $130,000",
                requiredMilestones=[
                    "Independent feature ownership across stack",
                    "Production monitoring and bug triage",
                    "CI/CD deployment familiarity"
                ],
                isCurrent=True
            ),
            TrajectoryStage(
                stage="Target (6-12 Months)",
                roleTitle="Senior Full-Stack Engineer",
                estimatedTimeframe="Q1 2027",
                salaryRange="$145,000 - $175,000",
                requiredMilestones=[
                    "System design leadership and RFC authorship",
                    "Cross-team mentorship and architecture reviews",
                    "Cloud infrastructure orchestration (K8s/Terraform)"
                ],
                isCurrent=False
            ),
            TrajectoryStage(
                stage="Next Horizon (2-3 Years)",
                roleTitle="Staff Engineer / Tech Lead",
                estimatedTimeframe="2028 - 2029",
                salaryRange="$190,000 - $240,000+",
                requiredMilestones=[
                    "Multi-team engineering vision and strategy",
                    "Organization-wide reliability and scaling standards",
                    "Core domain architecture ownership"
                ],
                isCurrent=False
            )
        ]
    )

@router.get("/skills")
async def get_skills_breakdown(current_user: dict = Depends(get_current_user)):
    career_data = await get_career_insights(current_user)
    return {
        "recommendedSkills": career_data.recommendedSkills,
        "marketDemandIndex": career_data.hiringDemandIndex,
        "salaryBenchmark": career_data.salaryBenchmark
    }

@router.get("/trajectory")
async def get_trajectory_roadmap(current_user: dict = Depends(get_current_user)):
    career_data = await get_career_insights(current_user)
    return {
        "trajectoryPath": career_data.trajectoryPath,
        "marketReadinessScore": career_data.marketReadinessScore
    }
