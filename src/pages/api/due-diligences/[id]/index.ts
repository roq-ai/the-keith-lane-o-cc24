import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dueDiligenceValidationSchema } from 'validationSchema/due-diligences';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.due_diligence
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDueDiligenceById();
    case 'PUT':
      return updateDueDiligenceById();
    case 'DELETE':
      return deleteDueDiligenceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDueDiligenceById() {
    const data = await prisma.due_diligence.findFirst(convertQueryToPrismaUtil(req.query, 'due_diligence'));
    return res.status(200).json(data);
  }

  async function updateDueDiligenceById() {
    await dueDiligenceValidationSchema.validate(req.body);
    const data = await prisma.due_diligence.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDueDiligenceById() {
    const data = await prisma.due_diligence.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
