export class Person {
    personId: number;
    name: string;
    age: number;
    work: string;
    salary: number;

    constructor(id: number, name: string, age: number, work: string, salary: number) {
        this.personId = id;
        this.name = name;
        this.age = age;
        this.work = work;
        this.salary = salary;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public getWork(): string {
        return this.work;
    }

    public getSalary(): number {
        return this.salary;
    }

    public getId(): number {
        return this.personId;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setAge(age: number): void {
        this.age = age;
    }

    public setWork(work: string): void {
        this.work = work;
    }

    public setSalary(salary: number): void {
        this.salary = salary;
    }
}