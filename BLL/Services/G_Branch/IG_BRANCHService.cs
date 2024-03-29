﻿using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.G_Branch
{
    public interface IG_BranchService
    {
        G_BRANCH GetById(int id);
        G_BRANCH GetAll();
        List<G_BRANCH> GetAll(Expression<Func<G_BRANCH, bool>> predicate);
        G_BRANCH Insert(G_BRANCH iControl);
        G_BRANCH Update(G_BRANCH iControl);
     

        void Delete(int id);
    }
}
