import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specitication = new Specification();
    Object.assign(specitication, {
      description,
      name,
    });

    this.specifications.push(specitication);

    return specitication;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((item) => item.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.specifications.filter((item) =>
      ids.includes(item.id)
    );

    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };
