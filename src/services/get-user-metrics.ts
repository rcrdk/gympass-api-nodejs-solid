import { CheckInsRepository } from '@/repositories/checkins-repository'

interface GetUserMetricsServiceRequest {
	userId: string
}

interface GetUserMetricsServiceResponse {
	checkInsCount: number
}

export class GetUserMetricsService {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({
		userId,
	}: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		return {
			checkInsCount,
		}
	}
}
