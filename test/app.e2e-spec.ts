import { Test } from '@nestjs/testing'
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDTO } from '../src/auth/dto';

describe('App', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3333');
    await app.init();
    await app.listen(3333);
  });

  afterAll(() => {
    app.close();
  })

  describe('Auth', () => {
    const dto: AuthDTO = {
      email: 'test1@test.com',
      password: '1223test'
    }
    describe('Signup', () => {
      it('should signup', () => {
        return pactum.spec().post('/auth/signup')
        .withBody(dto)
        .expectStatus(200)
      });
      it('should throw an error when email is empty', () => {
        return pactum.spec().post('/auth/signup')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400)
      });
      it('should throw an error when password is empty', () => {
        return pactum.spec().post('/auth/signup')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400)
      });
      it('should throw an error when body is empty', () => {
        return pactum.spec().post('/auth/signup')
        .expectStatus(400)
      });
    });

    describe('Signin', () => {
      it('should signup', () => {
        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(201)
      });
      it('should throw an error when email is empty', () => {
        return pactum.spec().post('/auth/signin')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400)
      });
      it('should throw an error when password is empty', () => {
        return pactum.spec().post('/auth/signin')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400)
      });
      it('should throw an error when body is empty', () => {
        return pactum.spec().post('/auth/signin')
        .expectStatus(400)
      });
    });
  });

  describe('User', () => {
    describe('Get current user', () => {

    });

    describe('Edit user', () => {

    });
  });

  describe('Bookmarks', () => {
    describe('Get Bookmarks', () => {

    });

    describe('Create bookmarks', () => {

    });

    describe('Get bookmark by id', () => {

    });

    describe('Edit bookmarks', () => {

    });

    describe('Delete bookmarks', () => {

    });
  });
  
  it.todo('Passed');
  it.todo('Passed 3');
})