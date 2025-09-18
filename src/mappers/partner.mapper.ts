// src/partners/mappers/partner.mapper.ts
import { Partner } from '../entities/partner/partner.entity';
import { PartnerResponse } from '../interfaces/partner.interface';

export class PartnerMapper {
  static toResponse(entity: Partner): PartnerResponse {
    return {
      ...entity,
      resellPolicy: {
        premium: {
          base: entity.resellPolicy.premium.base,
          discountedBands:
            entity.resellPolicy.premium['discountedBands'] ??
            entity.resellPolicy.premium['bands']?.discountedBands ??
            [],
        },
        gold: {
          base: entity.resellPolicy.gold.base,
          discountedBands:
            entity.resellPolicy.gold['discountedBands'] ??
            entity.resellPolicy.gold['bands']?.discountedBands ??
            [],
        },
      },
    };
  }

  static toResponseList(entities: Partner[]): PartnerResponse[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
