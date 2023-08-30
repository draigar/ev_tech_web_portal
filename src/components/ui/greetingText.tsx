import React from 'react'
import { formatter } from 'web/helper';

interface GreetingTextProp {
  title?: string;
  description?: string;
  additionalComponent?: any;
  hasSideInfo?: boolean;
}

export const GreetingText = (props: GreetingTextProp) => {
  const { description, title, additionalComponent, hasSideInfo = false } = props;
  return (
    <div className="row mb-3 pb-1">
      <div className="col-12">
        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
          <div className="flex-grow-1">
            <h4 className="fs-16 mb-1">{formatter.greetingFuncText()}, {title ? title : 'Francis!'}</h4>
            <p className="text-muted mb-0">{description}</p>
          </div>
          <div className="mt-3 mt-lg-0">
            <form action="#">
              <div className="row g-3 mb-0 align-items-center">
                <div className="col-auto">
                  {additionalComponent && additionalComponent()}
                  {hasSideInfo && (<button type="button" className="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"><i className="ri-pulse-line"></i></button>)}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
